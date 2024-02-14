"use server";

import { CMS_Products } from "@/app/api/_cms/items/products";
import { REVOLUT_Orders } from "../../api/_revolut/order";

export default async function actionBuy(id: string) {
  try {
    const product = await CMS_Products.readItem(id);
    const order = await REVOLUT_Orders.createItem({
      description: `${product.gallery_rel.title} - ${product.title}`,
      amount: product.price * 100,
      currency: "GBP",
    });

    return JSON.stringify({
      oid: order.data.id,
      token: order.data.token,
    });
  } catch (e) {
    console.log("ERR ", e);
    return e;
  }
}
