import { z } from "zod";

export const SContactForm = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(5),
});

export type TContactForm = z.infer<typeof SContactForm>;
