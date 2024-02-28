"use server";

import Stripe from "stripe";
import { TCartItemSimple } from "../../lib/store";
import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";
import { CMS_Products } from "@/app/api/_cms/items/store/products";

const secret_key = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(secret_key);

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

export async function actionStripeRetrievePaymentIntent(id: string) {
  console.log("actionStripeRetrievePaymentIntent");
  try {
    const session = await stripe.paymentIntents.retrieve(id);

    if (!session.client_secret) throw new Error("Stripe: No client secret");

    return session.client_secret;
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function actionStripeCreatePaymentIntent() {
  console.log("actionStripeCreatePaymentIntent");
  try {
    const session = await stripe.paymentIntents.create({
      amount: 100,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!session.client_secret) throw new Error("Stripe: No client secret");

    return JSON.stringify({
      clientSecret: session.client_secret,
      clientId: session.id,
    });
  } catch (err: any) {
    console.log(err.message);
  }
}

export default async function actionStripeUpdatePaymentIntent(
  id: string,
  cart: TCartItemSimple[],
  shipping_id: number | undefined
) {
  console.log("actionStripeUpdatePaymentIntent");
  try {
    let amount = 0;

    if (cart.length > 0) {
      amount = await recalculateSummary(cart, shipping_id);
    }

    await stripe.paymentIntents.update(id, {
      amount,
    });
  } catch (err: any) {
    console.log(err.message);
  }
}
