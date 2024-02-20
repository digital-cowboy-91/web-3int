import { z } from "zod";

const SShippingAddress = z.object({
  street_line_1: z.string().min(1).max(50),
  street_line_2: z.string().max(50).optional(),
  city: z.string().min(3).max(58),
  postcode: z.string().regex(/^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i),
});

export const SCheckout = z.object({
  product_id: z.string().uuid(),
  description: z.string(),
  quantity: z.coerce.number().min(1),
  colour: z.string().max(50).optional(),
  amount: z.coerce.number().positive(),
  forename: z.string().min(2).max(50),
  surname: z.string().min(2).max(50),
  email: z.string().email(),
  email_confirm: z.string().email(),
  shipping_address: SShippingAddress.optional(),
  note: z.string().max(255).optional(),
  privacy: z.literal(true).refine((val) => val === true, {
    message: "Please read and accept the privacy policy",
  }),
  terms: z.literal(true).refine((val) => val === true, {
    message: "Please read and accept the terms and conditions",
  }),
  marketing: z.boolean(),
});

export type TCheckout = z.infer<typeof SCheckout>;
