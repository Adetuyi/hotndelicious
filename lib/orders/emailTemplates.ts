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
