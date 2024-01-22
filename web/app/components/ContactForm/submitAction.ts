"use server";

import { CREATE, TContactForm } from "@/prisma/modelContactForm";

export default async function submitAction(data: TContactForm) {
  try {
    const res = await CREATE(data);
    return res;
  } catch (e) {
    return e;
  }
}
