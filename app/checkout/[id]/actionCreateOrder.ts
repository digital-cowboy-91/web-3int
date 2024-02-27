"use server";

import { CMS_Products } from "@/app/api/_cms/items/store/products";
import getDiscountCoef from "@/app/api/_cms/lib/getDiscountCoef";
import { REVOLUT_Orders, TOrderData } from "@/app/api/_revolut/order";
import { SCheckout, TCheckout } from "./lib/schema";

export default async function actionCreateOrder(
  data: TCheckout
): Promise<string> {
  try {
    SCheckout.parse(data);

    const {
      product_id,
      description,
      quantity,
      forename,
      surname,
      shipping_address,
      note,
      colour,
      privacy,
      terms,
      marketing,
    } = data;
    const { discounts, price, downloadable } = await CMS_Products.readItem(
      product_id
    );

    const orderData: TOrderData = {
      description,
      amount:
        quantity === 1
          ? price * 100
          : Math.round(
              price * quantity * getDiscountCoef(discounts, quantity) * 100
            ),
      currency: "GBP",
      customer: {
        full_name: forename + " " + surname,
        email: data.email,
      },
      shipping_address: shipping_address
        ? {
            street_line_1: shipping_address.street_line_1,
            street_line_2: shipping_address.street_line_2,
            country_code: "GB",
            city: shipping_address.city,
            postcode: shipping_address.postcode,
          }
        : undefined,
      metadata: {
        product_id,
        quantity,
        note,
        colour,
        privacy,
        terms,
        marketing,
        downloadable,
        forename,
        surname,
      },
    };

    const order = await REVOLUT_Orders.createItem(orderData);

    return order.data.token;
  } catch (e) {
    console.log("ERR ", e);
    return JSON.stringify(e);
  }
}
