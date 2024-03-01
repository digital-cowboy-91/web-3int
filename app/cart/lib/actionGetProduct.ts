"use server";

import { CMS_Products } from "@/app/api/_cms/items/store/products";

export async function actionGetProduct(id: string) {
  let product = await CMS_Products.readItem(id);

  if (!product) throw new Error("No product found");

  return product;
}

export async function actionGetProducts(ids: string[]) {
  console.log("ids", ids.length);
  let products = await CMS_Products.readItems(ids);
  console.log("products", products.length);

  if (!products) throw new Error("No product found");

  return products;
}
