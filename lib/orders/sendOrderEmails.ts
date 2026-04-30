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

  const businessOk = businessResult.status === 'fulfilled' && !businessResult.value.error;
  const customerOk = customerResult.status === 'fulfilled' && !customerResult.value.error;

  if (!businessOk) {
    const reason =
      businessResult.status === 'rejected' ? businessResult.reason : businessResult.value.error;
    console.error('[orders] business email failed:', reason);
    return { ok: false, error: 'Failed to send order notification' };
  }

  if (!customerOk) {
    const reason =
      customerResult.status === 'rejected' ? customerResult.reason : customerResult.value.error;
    console.error('[orders] customer email failed:', reason);
    return { ok: true, warning: 'customer-email-failed' };
  }

  return { ok: true };
};
