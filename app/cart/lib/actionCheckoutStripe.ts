"use server";

import Stripe from "stripe";
import { TCartItemSimple } from "./store";
import { CMS_Products } from "@/app/api/_cms/items/store/products";

const secret_key = process.env.STRIPE_SECRET_KEY!;

async function sessionParams(
  cart: TCartItemSimple[]
): Promise<Stripe.Checkout.SessionCreateParams> {
  let addressRequired = false;
  let line_items = [];

  for (let i of cart) {
    let { pid, quantity, fid } = i;

    let product = await CMS_Products.readItem(pid);

    if (!product) throw new Error(`Product id [${pid}] not found`);

    if (product.downloadable && !addressRequired) addressRequired = true;

    let name = product.gallery_rel.title;

    let description = (() => {
      let prefix = product.title;
      let separator = " · ";
      let appendix = "qty " + quantity;

      if (product.downloadable) {
        return prefix + " digital file";
      }

      if (!product.filament_rels) {
        return prefix + separator + appendix;
      }

      let f = product.filament_rels.find(
        (f) => f.filament_rel.id === fid
      )?.filament_rel;

      let filament = f?.material + ", " + f?.colour + " " + f?.cosmetic;

      return prefix + separator + filament + separator + appendix;
    })();

    let unit_price = product.price;
    let discount = 0;

    if (product.discounts) {
      let sorted = product.discounts.sort(
        (first, last) => last.quantity - first.quantity
      );
      discount = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;
    }

    let unit_amount = unit_price * quantity * (100 - discount);

    line_items.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name,
          description,
          images: [
            "https://3int.uk/media/" +
              product.gallery_rel.cover_image +
              "?key=h100",
          ],
          metadata: {
            pid,
          },
        },
        unit_amount,
      },
      quantity: 1,
    });
  }

  return {
    line_items,
    mode: "payment",
    success_url: "https://3int.uk/cart?success=true",
    cancel_url: "https://3int.uk/cart?cancel=true",
    shipping_address_collection: addressRequired
      ? undefined
      : { allowed_countries: ["GB"] },
  };
}

export default async function actionCheckoutStripe(cart: TCartItemSimple[]) {
  try {
    const stripe = new Stripe(secret_key);
    const params = await sessionParams(cart);
    const session = await stripe.checkout.sessions.create(params);

    if (!session.url) throw new Error("No session URL");

    return session.url;
  } catch (err: any) {
    console.log(err.message);
  }
}
