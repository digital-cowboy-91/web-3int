import cmsAPI from "../cmsAPI";
import { z } from "zod";

const base = "/items/client_queries";

export const SContactForm = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(5),
});

export type TContactForm = z.infer<typeof SContactForm>;

async function create(data: TContactForm) {
  return await cmsAPI(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export const CMS_ClientQuery = {
  create,
};
