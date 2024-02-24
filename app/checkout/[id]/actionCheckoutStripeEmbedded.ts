"use server";

import { TProduct } from "@/app/api/_cms/items/products";
import Stripe from "stripe";

const secret_key = process.env.STRIPE_SECRET_KEY!;

function sessionParams(product: TProduct): Stripe.Checkout.SessionCreateParams {
  const { id, title, price, downloadable, gallery_rel } = product;

  return {
    ui_mode: "embedded",
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: gallery_rel.title,
            description: title + (downloadable ? " digital file" : ""),
            images: ["https://3int.uk/media/" + gallery_rel.cover_image],
            metadata: {
              pid: id,
              downloadable: downloadable.toString(),
            },
          },
          unit_amount: price * 100,
          tax_behavior: "inclusive",
        },
        adjustable_quantity: downloadable
          ? undefined
          : {
              enabled: true,
              minimum: 1,
            },
        quantity: 1,
      },
    ],
    mode: "payment",
    redirect_on_completion: "never",
    shipping_address_collection: downloadable
      ? undefined
      : { allowed_countries: ["GB"] },
    // consent_collection: {
    //   terms_of_service: "required",
    // },
  };
}

export default async function actionCheckoutStripeEmbedded(product: TProduct) {
  try {
    const stripe = new Stripe(secret_key);
    const session = await stripe.checkout.sessions.create(
      sessionParams(product)
    );

    if (!session.client_secret) throw new Error("No session secret");

    console.log("session", session);

    return session.client_secret;
  } catch (err: any) {
    console.log(err.message);
  }
}
