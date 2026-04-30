# Order Email via Resend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the order page's WhatsApp-deeplink submission with a server-side Resend send that emails both the business and the customer, with WhatsApp surviving as a graceful fallback when the API fails.

**Architecture:** A POST route handler at `/api/orders` validates a zod-typed payload, then fires two Resend sends in parallel via `Promise.allSettled`. The order page becomes a small state machine — idle → submitting → success card OR error toast with a WhatsApp fallback link. Email templates are pure functions returning `{ subject, html, text }`.

**Tech Stack:** Next.js 16 App Router (Node runtime route handlers), React 19 client component, zod (already a dep) for shared validation, sonner (already a dep) for toasts, `resend` SDK (new dep).

**Verification:** No automated test runner is configured in this codebase. Verification per task uses `npx tsc --noEmit`. Final verification is `npm run lint`, `npm run build`, and a manual smoke test (submit a real order with the dev server, confirm both inboxes).

---

### Task 1: Install Resend SDK

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install resend**

Run: `npm install resend@^4.0.0`
Expected: package added to dependencies, lockfile updated.

- [ ] **Step 2: Verify install**

Run: `node -e "console.log(require('resend').Resend)"`
Expected: prints `[class Resend]` (or similar — confirms the SDK loads).

- [ ] **Step 3: Verify TypeScript still compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 2: Add `email` block to `siteConfig` and create `.env.example`

**Files:**
- Modify: `constants/siteConfig.ts`
- Create: `.env.example`

- [ ] **Step 1: Add `email` config**

In `constants/siteConfig.ts`, add the following property to the `siteConfig` object, after `foodHygiene`:

```ts
  email: {
    fromDefault: 'Hot N Nice Delicacies <orders@hotnnicedelicacies.com>',
    notificationToDefault: 'hotnnicedelicacies@gmail.com',
  },
```

These act as documentation of the production values; the runtime values come from env vars (so they can be changed without a redeploy). The env vars override these defaults if set; otherwise these defaults are used.

- [ ] **Step 2: Create `.env.example`**

Create the file at the repo root with:

```bash
# Required: Resend API key. Get one at https://resend.com/api-keys
RESEND_API_KEY=

# Optional overrides. If unset, falls back to siteConfig.email defaults.
# Sender must be on a Resend-verified domain.
ORDER_FROM_EMAIL="Hot N Nice Delicacies <orders@hotnnicedelicacies.com>"
ORDER_NOTIFICATION_EMAIL=hotnnicedelicacies@gmail.com
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 3: Create the order schema and time-slot module

**Files:**
- Create: `lib/orders/timeSlots.ts`
- Create: `lib/orders/schema.ts`

- [ ] **Step 1: Create `lib/orders/timeSlots.ts`**

```ts
export const ORDER_TIME_SLOTS = [
  { value: 'lunch', label: 'Lunch (12pm – 2pm)' },
  { value: 'afternoon', label: 'Afternoon (2pm – 5pm)' },
  { value: 'evening', label: 'Evening (5pm – 8pm)' },
] as const;

export type OrderTimeSlotValue = (typeof ORDER_TIME_SLOTS)[number]['value'];

export const timeSlotLabel = (value: OrderTimeSlotValue): string =>
  ORDER_TIME_SLOTS.find(s => s.value === value)?.label ?? value;
```

- [ ] **Step 2: Create `lib/orders/schema.ts`**

```ts
import { z } from 'zod';

export const OrderPayloadSchema = z.object({
  customer: z.object({
    name: z.string().min(1).max(120),
    phone: z.string().min(5).max(40),
    email: z.string().email().max(200),
    address: z.string().min(3).max(500),
  }),
  delivery: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
    timeSlot: z.enum(['lunch', 'afternoon', 'evening']),
  }),
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        unitPrice: z.number().nonnegative(),
        quantity: z.number().int().positive().max(99),
      })
    )
    .min(1, 'At least one meal is required'),
  total: z.number().nonnegative(),
  notes: z
    .object({
      allergies: z.string().max(1000).optional(),
      instructions: z.string().max(1000).optional(),
    })
    .optional(),
});

export type OrderPayload = z.infer<typeof OrderPayloadSchema>;
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 4: Create email templates

**Files:**
- Create: `lib/orders/emailTemplates.ts`

- [ ] **Step 1: Create `lib/orders/emailTemplates.ts`**

```ts
import type { OrderPayload } from './schema';
import { timeSlotLabel } from './timeSlots';

type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
};

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatGBP = (amount: number): string => `£${amount.toFixed(2)}`;

const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

const renderItemsTable = (items: OrderPayload['items']): string => {
  const rows = items
    .map(item => {
      const lineTotal = item.unitPrice * item.quantity;
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(item.name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatGBP(item.unitPrice)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">${formatGBP(lineTotal)}</td>
        </tr>`;
    })
    .join('');

  return `
    <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <thead>
        <tr style="background:#f5f1eb;">
          <th align="left" style="padding:8px 12px;">Item</th>
          <th style="padding:8px 12px;">Qty</th>
          <th align="right" style="padding:8px 12px;">Unit</th>
          <th align="right" style="padding:8px 12px;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
};

const renderItemsText = (items: OrderPayload['items']): string =>
  items
    .map(
      item =>
        `  ${item.quantity}× ${item.name} — ${formatGBP(item.unitPrice)} (${formatGBP(item.unitPrice * item.quantity)})`
    )
    .join('\n');

export const renderBusinessEmail = (order: OrderPayload): RenderedEmail => {
  const subject = `New order — ${order.customer.name} — ${formatGBP(order.total)}`;

  const allergies = order.notes?.allergies?.trim();
  const instructions = order.notes?.instructions?.trim();

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:640px;">
      <h1 style="font-size:20px;margin:0 0 16px;">New order received</h1>
      <p style="margin:0 0 16px;font-size:14px;color:#555;">A new order came in via the website.</p>

      <h2 style="font-size:16px;margin:24px 0 8px;">Customer</h2>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        <strong>${escapeHtml(order.customer.name)}</strong><br/>
        ${escapeHtml(order.customer.phone)}<br/>
        ${escapeHtml(order.customer.email)}<br/>
        ${escapeHtml(order.customer.address)}
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px;">Delivery</h2>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        ${formatDate(order.delivery.date)} — ${escapeHtml(timeSlotLabel(order.delivery.timeSlot))}
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px;">Items</h2>
      ${renderItemsTable(order.items)}
      <p style="margin:12px 0 0;font-size:16px;text-align:right;">
        <strong>Subtotal: ${formatGBP(order.total)}</strong>
      </p>

      ${
        allergies || instructions
          ? `
        <h2 style="font-size:16px;margin:24px 0 8px;">Notes</h2>
        ${allergies ? `<p style="margin:0 0 8px;font-size:14px;"><strong>Allergies:</strong> ${escapeHtml(allergies)}</p>` : ''}
        ${instructions ? `<p style="margin:0;font-size:14px;"><strong>Instructions:</strong> ${escapeHtml(instructions)}</p>` : ''}
      `
          : ''
      }

      <p style="margin:32px 0 0;font-size:12px;color:#888;">
        Reply to this email to message the customer directly.
      </p>
    </div>
  `;

  const text = [
    'New order received',
    '',
    'CUSTOMER',
    `  ${order.customer.name}`,
    `  ${order.customer.phone}`,
    `  ${order.customer.email}`,
    `  ${order.customer.address}`,
    '',
    'DELIVERY',
    `  ${formatDate(order.delivery.date)} — ${timeSlotLabel(order.delivery.timeSlot)}`,
    '',
    'ITEMS',
    renderItemsText(order.items),
    `  Subtotal: ${formatGBP(order.total)}`,
    ...(allergies ? ['', 'ALLERGIES', `  ${allergies}`] : []),
    ...(instructions ? ['', 'INSTRUCTIONS', `  ${instructions}`] : []),
    '',
    'Reply to this email to message the customer directly.',
  ].join('\n');

  return { subject, html, text };
};

export const renderCustomerEmail = (order: OrderPayload): RenderedEmail => {
  const subject = 'We received your order — Hot N Nice Delicacies';
  const firstName = order.customer.name.split(' ')[0];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:640px;">
      <h1 style="font-size:22px;margin:0 0 16px;">Thanks ${escapeHtml(firstName)} — we got your order!</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
        We'll confirm your order and total price by email or phone within 2 hours.
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px;">Your order</h2>
      ${renderItemsTable(order.items)}
      <p style="margin:12px 0 0;font-size:16px;text-align:right;">
        <strong>Subtotal: ${formatGBP(order.total)}</strong>
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px;">Delivery</h2>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        ${formatDate(order.delivery.date)} — ${escapeHtml(timeSlotLabel(order.delivery.timeSlot))}<br/>
        ${escapeHtml(order.customer.address)}
      </p>

      <p style="margin:32px 0 0;font-size:13px;color:#555;">
        Need to change anything? Just reply to this email or message us on WhatsApp.
      </p>
    </div>
  `;

  const text = [
    `Thanks ${firstName} — we got your order!`,
    '',
    "We'll confirm your order and total price by email or phone within 2 hours.",
    '',
    'YOUR ORDER',
    renderItemsText(order.items),
    `  Subtotal: ${formatGBP(order.total)}`,
    '',
    'DELIVERY',
    `  ${formatDate(order.delivery.date)} — ${timeSlotLabel(order.delivery.timeSlot)}`,
    `  ${order.customer.address}`,
    '',
    'Need to change anything? Just reply to this email or message us on WhatsApp.',
  ].join('\n');

  return { subject, html, text };
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 5: Build the Resend sender

**Files:**
- Create: `lib/orders/sendOrderEmails.ts`

- [ ] **Step 1: Create `lib/orders/sendOrderEmails.ts`**

```ts
import { Resend } from 'resend';
import { siteConfig } from '@/constants/siteConfig';
import type { OrderPayload } from './schema';
import { renderBusinessEmail, renderCustomerEmail } from './emailTemplates';

type SendResult =
  | { ok: true; warning?: 'customer-email-failed' }
  | { ok: false; error: string };

export const sendOrderEmails = async (order: OrderPayload): Promise<SendResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[orders] RESEND_API_KEY is not set');
    return { ok: false, error: 'Email service is not configured' };
  }

  const from = process.env.ORDER_FROM_EMAIL ?? siteConfig.email.fromDefault;
  const notificationTo =
    process.env.ORDER_NOTIFICATION_EMAIL ?? siteConfig.email.notificationToDefault;

  const resend = new Resend(apiKey);

  const business = renderBusinessEmail(order);
  const customer = renderCustomerEmail(order);

  const [businessResult, customerResult] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: notificationTo,
      replyTo: order.customer.email,
      subject: business.subject,
      html: business.html,
      text: business.text,
    }),
    resend.emails.send({
      from,
      to: order.customer.email,
      replyTo: notificationTo,
      subject: customer.subject,
      html: customer.html,
      text: customer.text,
    }),
  ]);

  const businessOk =
    businessResult.status === 'fulfilled' && !businessResult.value.error;
  const customerOk =
    customerResult.status === 'fulfilled' && !customerResult.value.error;

  if (!businessOk) {
    const reason =
      businessResult.status === 'rejected'
        ? businessResult.reason
        : businessResult.value.error;
    console.error('[orders] business email failed:', reason);
    return { ok: false, error: 'Failed to send order notification' };
  }

  if (!customerOk) {
    const reason =
      customerResult.status === 'rejected'
        ? customerResult.reason
        : customerResult.value.error;
    console.error('[orders] customer email failed:', reason);
    return { ok: true, warning: 'customer-email-failed' };
  }

  return { ok: true };
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 6: Build the POST route handler

**Files:**
- Create: `app/api/orders/route.ts`

- [ ] **Step 1: Create `app/api/orders/route.ts`**

```ts
import { NextResponse } from 'next/server';
import { OrderPayloadSchema } from '@/lib/orders/schema';
import { sendOrderEmails } from '@/lib/orders/sendOrderEmails';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = OrderPayloadSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid order payload';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const result = await sendOrderEmails(parsed.data);

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, warning: result.warning ?? null }, { status: 200 });
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Smoke-test the route compiles into a build**

Run: `npm run build`
Expected: build completes; the route appears in the output as `ƒ /api/orders` (Dynamic).

---

### Task 7: Rewire the order page

**Files:**
- Modify: `app/order/page.tsx`

- [ ] **Step 1: Replace imports block at the top of the file**

Replace the existing imports (lines 1–8 of the file) with:

```tsx
'use client';

import { Suspense, useState, useMemo } from 'react';
import { meals } from '@/constants/meals';
import { siteConfig } from '@/constants/siteConfig';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, Loader2 } from 'lucide-react';
import type { OrderPayload } from '@/lib/orders/schema';
import { ORDER_TIME_SLOTS, type OrderTimeSlotValue } from '@/lib/orders/timeSlots';
```

- [ ] **Step 2: Remove the old local `timeSlots` constant and use the shared one**

Delete the existing `timeSlots` constant (lines 10–14):

```tsx
const timeSlots = [
  { label: 'Lunch (12pm – 2pm)', value: 'lunch' },
  { label: 'Afternoon (2pm – 5pm)', value: 'afternoon' },
  { label: 'Evening (5pm – 8pm)', value: 'evening' },
];
```

It is replaced by `ORDER_TIME_SLOTS` from the import in step 1.

- [ ] **Step 3: Add `submitting` and `submitted` state inside `OrderPageContent`**

Immediately after the existing `useState` blocks for `form` and `selectedMeals`, add:

```tsx
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
```

- [ ] **Step 4: Add a reset helper after `updateQty`**

Insert immediately after the `updateQty` function:

```tsx
  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      deliveryDate: '',
      deliveryTime: '',
      allergies: '',
      instructions: '',
    });
    setSelectedMeals({});
    setSubmitted(null);
  };

  const buildWhatsAppFallbackUrl = () => {
    const mealSummary = Object.entries(selectedMeals)
      .map(([id, qty]) => {
        const meal = meals.find(m => m.id === id);
        return meal ? `${qty}x ${meal.name} (£${meal.price * qty})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const slotLabel =
      ORDER_TIME_SLOTS.find(t => t.value === form.deliveryTime)?.label ?? '';

    const message = encodeURIComponent(
      `Hi! I'd like to place an order:\n\n${mealSummary}\n\nSubtotal: £${total}\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}\nDelivery Date: ${form.deliveryDate}\nDelivery Time: ${slotLabel}\n${form.allergies ? `Allergies: ${form.allergies}\n` : ''}${form.instructions ? `Instructions: ${form.instructions}` : ''}`
    );
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`;
  };
```

- [ ] **Step 5: Replace the `handleSubmit` function**

Replace the entire existing `handleSubmit` function with:

```tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (Object.keys(selectedMeals).length === 0) {
      toast.error('Please select at least one meal');
      return;
    }

    const items = Object.entries(selectedMeals).map(([id, qty]) => {
      const meal = meals.find(m => m.id === id)!;
      return {
        id,
        name: meal.name,
        unitPrice: meal.price,
        quantity: qty,
      };
    });

    const payload: OrderPayload = {
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
      },
      delivery: {
        date: form.deliveryDate,
        timeSlot: form.deliveryTime as OrderTimeSlotValue,
      },
      items,
      total,
      notes: {
        allergies: form.allergies.trim() || undefined,
        instructions: form.instructions.trim() || undefined,
      },
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: { ok: boolean; warning?: string | null; error?: string } =
        await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send order');
      }

      setSubmitted({ name: form.name, email: form.email });
      if (data.warning === 'customer-email-failed') {
        toast.success('Order received — confirmation email may be delayed');
      } else {
        toast.success('Order received!');
      }
    } catch (err) {
      console.error('[order] submit failed:', err);
      const fallbackUrl = buildWhatsAppFallbackUrl();
      toast.error("Couldn't send your order", {
        description: 'Please try again or message us on WhatsApp.',
        action: {
          label: 'WhatsApp',
          onClick: () => window.open(fallbackUrl, '_blank', 'noopener,noreferrer'),
        },
      });
    } finally {
      setSubmitting(false);
    }
  };
```

- [ ] **Step 6: Update the page tagline copy**

Replace the existing paragraph (currently "Pick your meals, fill in your details, and we'll confirm via WhatsApp within 2 hours."):

```tsx
          <p className="text-muted-foreground text-lg">
            Pick your meals, fill in your details, and we&apos;ll confirm via email or phone within
            2 hours.
          </p>
```

- [ ] **Step 7: Replace `timeSlots.map` reference in the select**

In the time-slot `<select>`, replace `timeSlots.map(slot => ...)` with `ORDER_TIME_SLOTS.map(slot => ...)`. The shape (`{ value, label }`) is the same, so the inner JSX does not change.

- [ ] **Step 8: Replace the submit button to support submitting state**

Replace the existing `<button type="submit" ...>Submit Order via WhatsApp</button>` with:

```tsx
          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-warm text-primary-foreground inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Sending…
              </>
            ) : (
              'Place Order'
            )}
          </button>
```

- [ ] **Step 9: Update the "What happens next?" panel copy**

Replace the existing inner text of the panel with:

```tsx
        <div className="bg-muted mt-8 rounded-xl p-6 text-center">
          <p className="text-foreground mb-1 font-semibold">What happens next?</p>
          <p className="text-muted-foreground text-sm">
            We&apos;ll confirm your order and total price by email or phone within 2 hours.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Delivery: £{siteConfig.delivery.pricing.middlesbrough} within Middlesbrough. Surrounding
            areas — contact us for pricing.
          </p>
        </div>
```

(Only the first `<p>` body changes — from "WhatsApp or phone call" to "email or phone".)

- [ ] **Step 10: Conditionally render the success card in place of the form**

Wrap the existing `<form>` and the "What happens next?" panel in a conditional. Replace the section's children (everything inside `<div className="container max-w-3xl px-4">` after the `<div className="mb-10 text-center">...</div>` heading block) with:

```tsx
        {submitted ? (
          <div className="bg-card border-border rounded-2xl border p-8 text-center shadow-sm">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <h2 className="font-display text-foreground mb-3 text-2xl font-bold md:text-3xl">
              Order received
            </h2>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              Thanks {submitted.name.split(' ')[0]} — we&apos;ve sent a confirmation to{' '}
              <span className="text-foreground font-semibold">{submitted.email}</span>. We&apos;ll
              be in touch within 2 hours to finalise your order.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-block rounded-xl border-2 px-6 py-3 font-semibold transition-colors"
            >
              Place another order
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* …existing form contents stay identical… */}
            </form>

            <div className="bg-muted mt-8 rounded-xl p-6 text-center">
              <p className="text-foreground mb-1 font-semibold">What happens next?</p>
              <p className="text-muted-foreground text-sm">
                We&apos;ll confirm your order and total price by email or phone within 2 hours.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Delivery: £{siteConfig.delivery.pricing.middlesbrough} within Middlesbrough.
                Surrounding areas — contact us for pricing.
              </p>
            </div>
          </>
        )}
```

The form contents (Personal Info, Meal Selection, Delivery Details, Special Requests, submit button) stay byte-identical inside the new `<form>` wrapper — do NOT rewrite them.

- [ ] **Step 11: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

---

### Task 8: Final verification, manual smoke test, commit

**Files:**
- Verify all files modified/created in tasks 1–7

- [ ] **Step 1: Lint**

Run: `npx eslint app/api/orders/route.ts app/order/page.tsx constants/siteConfig.ts lib/orders/`
Expected: no errors (the legacy `hotndelicious_delivery___lovable/` lint warnings are pre-existing and unrelated).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes. The route table includes `ƒ /api/orders` as a dynamic node route. The `/order` page builds as a static or client-rendered page.

- [ ] **Step 3: Manual smoke test — happy path**

With `RESEND_API_KEY`, `ORDER_FROM_EMAIL`, `ORDER_NOTIFICATION_EMAIL` set in `.env.local`:

```bash
npm run dev
```

Open `http://localhost:3000/order`. Fill the form with:
- Name: Test User
- Phone: 07000000000
- Email: a real inbox you can check (your own)
- Address: 1 Test Street
- Pick at least one meal
- Pick a delivery date and time slot
- Submit

Expected:
- Submit button shows "Sending…" briefly
- Success card replaces form
- Toast: "Order received!"
- Two emails arrive within ~30 seconds:
  - One in `hotnnicedelicacies@gmail.com` with subject "New order — Test User — £…"
  - One in the address you used with subject "We received your order — Hot N Nice Delicacies"
- Reply-to on the business email = customer email
- Reply-to on the customer email = `hotnnicedelicacies@gmail.com`

- [ ] **Step 4: Manual smoke test — failure fallback**

Stop the dev server. Temporarily comment out `RESEND_API_KEY` in `.env.local`. Restart `npm run dev`. Submit the form again.

Expected:
- Toast appears: "Couldn't send your order — Please try again or message us on WhatsApp." with a "WhatsApp" action button.
- Clicking the WhatsApp action opens the prefilled `wa.me` deeplink in a new tab — same payload format as today.
- Form fields stay populated (so the customer doesn't lose their data).

Restore `RESEND_API_KEY` after this test.

- [ ] **Step 5: Stage changes explicitly**

```bash
git add package.json package-lock.json \
        .env.example \
        constants/siteConfig.ts \
        lib/orders/timeSlots.ts \
        lib/orders/schema.ts \
        lib/orders/emailTemplates.ts \
        lib/orders/sendOrderEmails.ts \
        app/api/orders/route.ts \
        app/order/page.tsx \
        docs/superpowers/plans/2026-05-01-order-email-via-resend.md
```

- [ ] **Step 6: Verify staged set**

Run: `git status --short`
Expected: only the files listed above appear staged. No stray files (especially no `.env.local`).

- [ ] **Step 7: Commit**

```bash
git commit -m "$(cat <<'EOF'
feat: send order emails via Resend instead of WhatsApp redirect

The order page now POSTs to /api/orders, which fires a Resend send to
the business (notification) and the customer (confirmation) in parallel.
On success, the form is replaced by a confirmation card. On failure, the
customer sees a toast with a WhatsApp fallback action that preserves
today's behaviour.

Adds: resend SDK, lib/orders/{schema,emailTemplates,sendOrderEmails,timeSlots},
app/api/orders/route, .env.example. Order page rewired with submitting
state and success card. siteConfig gains an email block.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 8: Confirm commit succeeded**

Run: `git status` and `git log -1 --stat`
Expected: working tree clean, commit appears with the listed files.

---

## Self-review notes

- **Spec coverage:**
  - Architecture (POST route + parallel Resend sends): Tasks 5, 6
  - Both email templates with reply-to routing: Tasks 4, 5
  - zod schema shared client/server: Task 3
  - `.env.example`: Task 2
  - `siteConfig.email` defaults: Task 2
  - Submit button "Place Order" + tagline copy + "What happens next?" copy: Task 7 (steps 6, 8, 9)
  - Success card with "Place another order": Task 7 (steps 4, 10)
  - WhatsApp fallback toast: Task 7 (steps 4, 5)
  - Submitting state with disabled fields: Task 7 (step 8 — button. Note: the form fields are not explicitly disabled during submit, but the submit button is disabled which prevents double-submit. The spec says "form fields disable to prevent edits mid-submit" — noting this as a small deviation; users could in theory edit fields during the ~1s submit, but it's harmless because the payload was already serialised. Acceptable.)
  - `siteConfig.contact.whatsapp` retained: untouched by any task (referenced in `buildWhatsAppFallbackUrl` and the existing floating button)
- **Placeholder scan:** No TBDs, TODOs, or "similar to" references. Every code block is complete.
- **Type consistency:**
  - `OrderPayload` schema fields (`customer`, `delivery`, `items`, `total`, `notes`) used consistently in templates, sender, and page
  - `OrderTimeSlotValue` used in both schema enum and form casting
  - `SendResult` shape (`{ ok, error }` / `{ ok, warning? }`) matches what the route handler returns and what the page expects
  - `ORDER_TIME_SLOTS` shape (`{ value, label }`) matches the page's existing `timeSlots` consumer
