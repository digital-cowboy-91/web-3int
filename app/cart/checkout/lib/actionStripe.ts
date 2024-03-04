"use server";

import Stripe from "stripe";
import { TCartItemSimple, revalidateCart } from "../../lib/revalidateCart";
import { summarizeCart } from "../../lib/summarizeCart";
import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";

const secret_key = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(secret_key);

export const retrievePaymentIntent = async (id: string) => {
  const session = await stripe.paymentIntents.retrieve(id);
  const clientSecret = session.client_secret;
  if (!clientSecret) throw new Error("Stripe: No client secret");
  return clientSecret;
};

export async function serverCartRevalidation(
  cartItems: TCartItemSimple[],
  shippingId: number
) {
  let cartData = await revalidateCart(cartItems);
  if (!cartData) throw new Error("No revalidation data");

  let { cart, products } = cartData;
  if (!cart || cart.length === 0) throw new Error("Cart is empty");

  let shippingPrice = 0;
  if (shippingId !== -1) {
    let res = await CMS_Shipping.readItem(shippingId);

    if (!res) {
      throw new Error("No shipping found");
    }

    shippingPrice = res.price;
  }

  let summary = summarizeCart(cart, shippingPrice);

  return {
    cart,
    products,
    summary,
  };
}

export async function createPaymentIntent(
  cartItems: TCartItemSimple[],
  shippingId: number
) {
  try {
    const { cart, products, summary } = await serverCartRevalidation(
      cartItems,
      shippingId
    );

    const session = await stripe.paymentIntents.create({
      amount: Math.round(summary.total.value * 100),
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!session.client_secret) throw new Error("Stripe: No client secret");

    return {
      cart,
      _cache: products,
      clientSecret: session.client_secret,
      clientId: session.id,
      amount: session.amount,
    };
  } catch (err: any) {
    console.log("Error occurred:", err.message);
    return undefined;
  }
}

export async function updatePaymentIntent(
  paymentIntentId: string,
  cartItems: TCartItemSimple[],
  shippingId: number
) {
  try {
    const { cart, products, summary } = await serverCartRevalidation(
      cartItems,
      shippingId
    );

    await stripe.paymentIntents.update(paymentIntentId, {
      amount: Math.round(summary.total.value * 100),
    });

    return {
      cart,
      _cache: products,
    };
  } catch (err) {
    console.error(err);
  }
}
