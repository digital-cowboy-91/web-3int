"use server";

import readItems from "./readItems";

export default async function CMSProductsReadItems_server(ids?: string[]) {
  return await readItems(ids);
}
