"use server";

import { CMS_Products } from "@/app/api/_cms/items/store/products";

export default async function actionGetProduct(id: string) {
  let product = await CMS_Products.readItem(id);

  if (!product) throw new Error("No product found");

  return JSON.stringify(product);
}
