"use server";

import { REVOLUT_Orders } from "@/app/api/_revolut/order";

export default async function actionProcess(id: string) {
  try {
    const order = await REVOLUT_Orders.readItem(id);

    console.log("ORDER", order);

    return JSON.stringify(order);
  } catch (e) {
    console.log("ERR ", e);
    return e;
  }
}
