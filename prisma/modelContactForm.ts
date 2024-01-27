import prisma from "./client";
import { z } from "zod";

export const SContactForm = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(5),
});

export type TContactForm = z.infer<typeof SContactForm>;

export async function CREATE(data: TContactForm) {
  try {
    // const response = await prisma.contactForm.create({
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //     subject: data.subject,
    //     message: data.message,
    //   },
    // });

    const response = fetch("/api/components/contact_form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return { success: true, data: response };
  } catch (e) {
    return { success: false, data: e };
  }
}
