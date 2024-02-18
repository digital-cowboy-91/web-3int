"use server";

import {
  CMS_ClientQuery,
  TContactForm,
} from "@/app/api/_cms/items/clientQueries";

export default async function submitAction(data: TContactForm) {
  try {
    const res = await CMS_ClientQuery.createItem(data);

    if (res.status === 204) return "success";

    throw new Error("Failed to submit form");
  } catch (e) {
    console.log("ERR ", e);
    return e;
  }
}
