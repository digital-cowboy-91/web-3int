"use server";

import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";

export default async function actionGetShipping() {
  let shipping = await CMS_Shipping.readItems();

  if (!shipping) throw new Error("No shipping found");

  return JSON.stringify(shipping);
}
