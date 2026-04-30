# Order Submission via Resend Email — Design Spec

**Date:** 2026-05-01
**Status:** Approved (pending user spec review)

## Summary

Replace the order page's WhatsApp-deeplink submission with a server-side Resend email send. On submit, two emails go out in parallel: a notification to the business (`hotnnicedelicacies@gmail.com`) and a confirmation to the customer. The order page shows a confirmation card on success and gracefully falls back to a WhatsApp link if the email send fails.

## Motivation

The current flow opens `wa.me/...?text=...` in a new tab with a prefilled message. This relies on the customer (a) having WhatsApp, (b) actually pressing send in the WhatsApp UI, and (c) leaving the site to do it. Many never complete the loop. A server-side email send removes that friction, gives the business a structured record in their inbox, and gives the customer a written confirmation.

## Architecture

```
[ Order page (Client Component) ]
         │
         │  fetch('/api/orders', { method: 'POST', body: JSON })
         ▼
[ app/api/orders/route.ts (Route Handler, Node runtime) ]
         │
         │  validate with zod → call lib/orders/sendOrderEmails.ts
         ▼
[ Resend SDK ] ──► business@gmail (notification, replyTo customer)
              └─► customer (confirmation, replyTo gmail)
```

One POST route, two emails per request fired in parallel via `Promise.allSettled` so a customer-side failure doesn't block the business notification.

**Runtime:** Node (not Edge) — the `resend` SDK has known Edge-runtime gotchas and Node is fine here since this isn't a high-frequency endpoint.

## Email behaviour

### Business notification
- **To:** `hotnnicedelicacies@gmail.com` (configurable via env)
- **From:** `Hot N Nice Delicacies <orders@hotnnicedelicacies.com>` (verified domain)
- **Reply-To:** customer's email — so replying from Gmail replies to the customer directly
- **Subject:** `New order — {customer name} — £{total}`
- **Body:** full order summary (meals + qty + per-line totals, subtotal, customer contact info, delivery address, delivery date and time slot, allergies, special instructions)

### Customer confirmation
- **To:** customer's email (collected in form)
- **From:** `Hot N Nice Delicacies <orders@hotnnicedelicacies.com>`
- **Reply-To:** `hotnnicedelicacies@gmail.com` — replies land in business Gmail
- **Subject:** `We received your order — Hot N Nice Delicacies`
- **Body:** friendly thank-you, order summary, "we'll confirm within 2 hours via email or phone", business contact info

Both emails ship as HTML with a plain-text fallback. Inline HTML strings — no `react-email` or similar dependency.

## Files

### New

- `app/api/orders/route.ts` — POST route handler. Parses JSON body, validates via zod schema, calls sender. Returns `{ ok: true }` (200) on success or `{ ok: false, error: string }` (400 on validation, 500 on send failure).
- `lib/orders/schema.ts` — single `OrderPayloadSchema` (zod) and inferred `OrderPayload` type. Shared by client (for typing the fetch body) and server (for validation).
- `lib/orders/sendOrderEmails.ts` — orchestrates the Resend calls. Reads env vars, constructs the Resend client lazily, invokes `Promise.allSettled` on both sends, returns a structured result.
- `lib/orders/emailTemplates.ts` — pure functions `renderBusinessEmail(order)` and `renderCustomerEmail(order)` returning `{ subject, html, text }`. No side effects, no env reads.
- `.env.example` — committed example env file documenting the required vars.

### Modified

- `app/order/page.tsx` — replace WhatsApp redirect handler with `fetch('/api/orders', ...)`. Add `submitting` state. On success: clear form and render a confirmation card in place of the form. On failure: show a sonner toast with a "Try WhatsApp instead →" link that opens the prefilled WhatsApp deeplink (preserving today's behaviour as graceful fallback). Update the page tagline copy. Update the submit button label to "Place Order". Update the "What happens next?" copy.
- `constants/siteConfig.ts` — add `email: { from, notificationTo }` block so the addresses live alongside other config.
- `package.json` — add `resend` dependency.

## Schema

```ts
// lib/orders/schema.ts
import { z } from 'zod';

export const OrderPayloadSchema = z.object({
  customer: z.object({
    name: z.string().min(1).max(120),
    phone: z.string().min(5).max(40),
    email: z.string().email().max(200),
    address: z.string().min(3).max(500),
  }),
  delivery: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
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

The client builds this payload from form state before fetching. The server re-validates as a defence-in-depth check (never trust the client). The server uses the *server-side* meal price lookup (from `constants/meals.ts`) when computing the email's displayed totals — the client's `total` is a hint, not an authority. (No payment is taken, so this is mostly a sanity check; primary purpose is to prevent obviously broken values like negative totals appearing in emails.)

## Env vars

Required at runtime:

```
RESEND_API_KEY=re_xxx
ORDER_FROM_EMAIL="Hot N Nice Delicacies <orders@hotnnicedelicacies.com>"
ORDER_NOTIFICATION_EMAIL=hotnnicedelicacies@gmail.com
```

- Stored locally in `.env.local` (gitignored). On hosting platform (Vercel/etc.) added via the dashboard environment variables UI.
- Route handler reads these inside the handler function (not at module top level). If `RESEND_API_KEY` is missing it returns 500 with a clear server-side log message rather than crashing the import.
- `.env.example` is committed so future contributors know what's needed.

## Order page UX

### Idle state
- Form looks identical to today.
- Submit button text: **"Place Order"** (was "Submit Order via WhatsApp").
- Page tagline: "Pick your meals, fill in your details, and **we'll confirm via email or phone within 2 hours**."

### Submitting
- Submit button shows a spinner and disables.
- Form fields disable to prevent edits mid-submit.

### Success
- Form is replaced by a green confirmation card:
  - Heading: "Order received"
  - Body: "Thanks {first name} — we've sent a confirmation to {email}. We'll be in touch within 2 hours to finalise your order."
  - Secondary button: "Place another order" (resets form to empty state)
- Toast: brief success toast as well.

### Failure
- Form remains visible (and re-enabled) so the customer doesn't lose their data.
- Toast (`sonner`):
  - Title: "Couldn't send your order"
  - Body: "Please try again, or message us on WhatsApp →"
  - Action link: opens prefilled WhatsApp deeplink (same payload format as today). Uses `siteConfig.contact.whatsapp`.

### "What happens next?" panel
- Updated copy: "We'll confirm your order and total price by email or phone within 2 hours."

## Failure handling matrix

| Scenario | HTTP | Client behaviour |
|---|---|---|
| Both emails sent | 200 | Show success card, clear form |
| Business email sent, customer email failed | 200 with `warning: 'customer-email-failed'` | Show success card, with note "Confirmation email may be delayed" |
| Business email failed | 500 | Toast: try again or use WhatsApp |
| Validation error | 400 | Toast with the validation message |
| Resend API key missing on server | 500 | Toast: "Couldn't send — please use WhatsApp" |

The business-side success is the order's source of truth: as long as the business gets the notification, the order counts.

## Security / abuse considerations

- No rate limiting in this iteration — low traffic site, low abuse risk. If the form gets spammed later, add a simple per-IP token bucket or honeypot field.
- No CAPTCHA — same reasoning. Easy to add (turnstile/hcaptcha) if needed.
- Email content is composed on the server using the order data; user-provided strings are HTML-escaped before being inserted into the HTML template. Never interpolate user strings into email headers (subject uses customer's name — must escape control characters).

## Out of scope

- Persisting orders to a database — emails are system of record
- Stripe or any payment collection — orders remain quote-and-confirm
- Admin dashboard / order list view
- Resend webhook handling (delivery/bounce events)
- Customer login / account creation
- Internationalisation
- Analytics / conversion tracking on order submit

## Verification

After implementation:
1. `npm run lint` — no new errors
2. `npm run build` — passes
3. With `.env.local` populated and `npm run dev` running: submit a test order. Verify both emails arrive. Verify reply-to addresses are correct (reply on each email goes to the right place). Test failure mode by temporarily breaking `RESEND_API_KEY` — confirm the WhatsApp fallback toast appears.

## Open questions

None. All clarifying questions resolved during brainstorming:
- Email scope: two emails (business notification + customer confirmation)
- Sender domain: `hotnnicedelicacies.com`, verified on Resend
- Sender pattern: `from: orders@hotnnicedelicacies.com`, reply-to routing as documented above
- Post-submit UX: clear form, green success card, WhatsApp fallback on failure
- Submit button copy: "Place Order"
- "What happens next?" copy: "we'll confirm via email or phone within 2 hours"
- WhatsApp config: `siteConfig.contact.whatsapp` stays (used by floating button + failure fallback)
