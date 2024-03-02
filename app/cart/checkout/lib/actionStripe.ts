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

export async function createPaymentIntent(
  cartItems: TCartItemSimple[],
  shippingId: number
) {
  try {
    let cartData = await revalidateCart(cartItems);
    if (!cartData) throw new Error("No revalidation data");

    let { cart, _cache } = cartData;
    if (!cart || cart.length === 0) throw new Error("Cart is empty");

    let { total } = summarizeCart(cart, shippingId);

    const amountInCents = total.value * 100;
    const session = await stripe.paymentIntents.create({
      amount: amountInCents,
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

export async function updatePaymentIntent(
  paymentIntentId: string,
  cartItems: TCartItemSimple[],
  shippingId: number
) {
  try {
    let revalidatedCart = await revalidateCart(cartItems);

    if (!revalidatedCart) {
      throw new Error("No revalidation data");
    }

    let { cart, _cache } = revalidatedCart;

    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }

    let shipping = await CMS_Shipping.readItem(shippingId);

    if (!shipping) {
      throw new Error("No shipping found");
    }

    let { total } = summarizeCart(cart, shipping.price);

    let updatedPaymentIntent = await stripe.paymentIntents.update(
      paymentIntentId,
      {
        amount: total.value * 100,
      }
    );

    return {
      cart,
      _cache,
    };
  } catch (err) {
    console.error(err);
  }
}
