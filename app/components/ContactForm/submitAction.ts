"use server";

import { createClientQuery } from "@/cms/items/clientQueries";

export default async function submitAction(data) {
  try {
    const res = await createClientQuery(data);

    if (res.status === 204) return "success";

    throw new Error("Failed to submit form");
  } catch (e) {
    console.log("ERR ", e);
    return e;
  }
}
