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
