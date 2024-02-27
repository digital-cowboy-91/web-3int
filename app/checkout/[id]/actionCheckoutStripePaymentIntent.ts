"use server";

import { TProduct } from "@/app/api/_cms/items/store/products";
import Stripe from "stripe";

const secret_key = process.env.STRIPE_SECRET_KEY!;

function sessionParams(product: TProduct): Stripe.PaymentIntentCreateParams {
  const { id, title, price, downloadable, gallery_rel } = product;

  return {
    amount: price * 100,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  };
}

export default async function actionCheckoutStripePaymentIntent(
  product: TProduct
) {
  try {
    const stripe = new Stripe(secret_key);
    const session = await stripe.paymentIntents.create(sessionParams(product));

    if (!session.client_secret) throw new Error("No session secret");

    console.log("session", session);

    return session.client_secret;
  } catch (err: any) {
    console.log(err.message);
  }
}
