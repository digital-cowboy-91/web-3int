"use server";

import { TContactForm } from ".";
import createItem from "./createItem";

export default async function CMSClientQueriesCreateItem_server(
  data: TContactForm
) {
  try {
    return await createItem(data);
  } catch (err: any) {
    return { error: { message: err.message } };
  }
}
