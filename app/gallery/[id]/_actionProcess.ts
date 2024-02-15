"use server";

import { CMS_Orders } from "@/app/api/_cms/items/orders";
import { REVOLUT_Orders } from "@/app/api/_revolut/order";

export default async function actionProcess(id: string) {
  try {
    const order = await REVOLUT_Orders.readItem(id);

    const storeOrder = await CMS_Orders.createItem({
      r_id: order.data.id,
      r_token: order.data.token,
      product: order.data.metadata.product_id,
      amount: order.data.amount / 100,
      status: order.data.state,
      customer_email: order.data.customer.email,
    });

    return JSON.stringify(order);
  } catch (e) {
    console.log("ERR ", e);
    return e;
  }
}
