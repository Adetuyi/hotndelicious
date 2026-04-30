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
