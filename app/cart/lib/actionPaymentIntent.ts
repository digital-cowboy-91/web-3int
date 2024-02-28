"use server";

import Stripe from "stripe";
import { TCartItemSimple } from "./store";
import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";
import { CMS_Products } from "@/app/api/_cms/items/store/products";

const secret_key = process.env.STRIPE_SECRET_KEY!;

async function recalculateSummary(
  cart: TCartItemSimple[],
  shipping_id: number | undefined
) {
  const shipping = shipping_id
    ? (await CMS_Shipping.readItem(shipping_id)).price
    : 0;

  function round(number: number) {
    return Math.round(number * 100) / 100;
  }

  let amount = shipping * 100;

  for (let i of cart) {
    let { pid, quantity, fid } = i;

    let product = await CMS_Products.readItem(pid);

    if (!product) throw new Error(`Product id [${pid}] not found`);

    let unit_price = product.price;
    let discount = 0;

    if (product.discounts) {
      let sorted = product.discounts.sort(
        (first, last) => last.quantity - first.quantity
      );
      discount = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;
    }

    let unit_amount = unit_price * quantity * (100 - discount);
    amount += unit_amount;
  }

  return amount;
}

export default async function actionCheckoutStripePaymentIntent(
  cart: TCartItemSimple[],
  shipping_id: number | undefined
) {
  try {
    const stripe = new Stripe(secret_key);
    const session = await stripe.paymentIntents.create({
      amount: await recalculateSummary(cart, shipping_id),
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!session.client_secret) throw new Error("No session secret");

    console.log("session", session);

    return session.client_secret;
  } catch (err: any) {
    console.log(err.message);
  }
}
