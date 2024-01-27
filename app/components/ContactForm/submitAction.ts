"use server";

import { TContactForm } from "@/prisma/modelContactForm";

export default async function submitAction(data: TContactForm) {
  try {
    const URL = process.env.LOCAL_HOST + "/api/customer_queries";
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 200) throw new Error("Failed to submit form");

    return "success";
  } catch (e) {
    return e;
  }
}
