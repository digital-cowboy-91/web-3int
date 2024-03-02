"use server";

import Stripe from "stripe";
import { TCartItemSimple, revalidateCart } from "../../lib/revalidateCart";
import { summarizeCart } from "../../lib/summarizeCart";
import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";

const secret_key = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(secret_key);

export async function actionStripeRetrievePaymentIntent(id: string) {
  try {
    const session = await stripe.paymentIntents.retrieve(id);

    if (!session.client_secret) {
      throw new Error("Stripe: No client secret");
    }

    return session.client_secret;
  } catch (err) {
    return undefined;
  }
}

export async function actionStripeCreatePaymentIntent(
  simpleCart: TCartItemSimple[],
  shipping_id: number
) {
  try {
    let res = await revalidateCart(simpleCart);

    if (!res) throw new Error("No revalidation data");

    let { cart, _cache } = res;

    if (!cart || cart.length === 0) throw new Error("Cart is empty");

    let { total } = summarizeCart(cart, shipping_id);

    const session = await stripe.paymentIntents.create({
      amount: total.value * 100,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!session.client_secret) throw new Error("Stripe: No client secret");

    return {
      cart,
      _cache,
      clientSecret: session.client_secret,
      clientId: session.id,
    };
  } catch (err: any) {
    console.log("Error occurred:", err.message);
    return undefined;
  }
}

export default async function actionStripeUpdatePaymentIntent(
  id: string,
  simpleCart: TCartItemSimple[],
  shipping_id: number
) {
  try {
    let res = await revalidateCart(simpleCart);

    if (!res) throw new Error("No revalidation data");

    let { cart, _cache } = res;

    if (!cart || cart.length === 0) {
      throw new Error("Cart is empty");
    }

    let shipping = await CMS_Shipping.readItem(shipping_id);

    if (!shipping) throw new Error("No shipping found");

    let { total } = summarizeCart(cart, shipping.price);

    await stripe.paymentIntents.update(id, {
      amount: total.value * 100,
    });

    return {
      cart,
      _cache,
    };
  } catch (err: any) {
    console.error(err);
  }
}
