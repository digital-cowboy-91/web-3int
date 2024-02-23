"use server";

import { TProduct } from "@/app/api/_cms/items/products";
import Stripe from "stripe";

const secret_key = process.env.STRIPE_SECRET_KEY!;

function sessionParams(product: TProduct): Stripe.Checkout.SessionCreateParams {
  const { id, title, price, downloadable, gallery_rel } = product;

  return {
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
    success_url: `https://3int.uk/checkout/test/?success=true`,
    shipping_address_collection: downloadable
      ? undefined
      : { allowed_countries: ["GB"] },
    // consent_collection: {
    //   terms_of_service: "required",
    // },
  };
}

export default async function actionCheckoutStripe(product: TProduct) {
  try {
    const stripe = new Stripe(secret_key);
    const session = await stripe.checkout.sessions.create(
      sessionParams(product)
    );

    if (!session.url) throw new Error("No session URL");

    return session.url;
  } catch (err: any) {
    console.log(err.message);
  }
}
