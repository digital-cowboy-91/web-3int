"use server";

import { TCheckoutForm } from "./CheckoutForm";
import { REVOLUT_Orders } from "../../api/_revolut/order";

export default async function actionCreateOrder(
  data: TCheckoutForm
): Promise<string> {
  try {
    console.log("actionCreateOrder", data);
    const {
      pid,
      description,
      quantity,
      price,
      email,
      privacy,
      terms,
      marketing,
    } = data;

    const order = await REVOLUT_Orders.createItem({
      description,
      amount: price * quantity * 100,
      currency: "GBP",
      customer: {
        email,
      },
      metadata: {
        product_id: pid,
        privacy,
        terms,
        marketing,
      },
    });

    console.log("ORDER ", order);

    return JSON.stringify({ id: order.data.id, token: order.data.token });
  } catch (e) {
    console.log("ERR ", e);
    return JSON.stringify(e);
  }
}