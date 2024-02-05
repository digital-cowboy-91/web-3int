"use server";

import { createClientQuery } from "@/cms/items/clientQueries";
import { TContactForm } from "@/prisma/modelContactForm";

export default async function submitAction(data: TContactForm) {
  try {
    const res = await createClientQuery(data);

    if (res.status === 204) return "success";

    throw new Error("Failed to submit form");
  } catch (e) {
    console.log("ERR ", e);
    return e;
  }
}
