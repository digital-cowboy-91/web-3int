"use server";

import { CMS_Orders } from "@/app/api/_cms/items/store/orders";
import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";
import Stripe from "stripe";
import { TCartItemSimple, revalidateCart } from "../../lib/revalidateCart";
import { summarizeCart } from "../../lib/summarizeCart";

const secret_key = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(secret_key);

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

export async function actionStripePaymentHandler(
  cartItems: TCartItemSimple[],
  shippingId: number
) {
  try {
    const { cart, summary } = await serverCartRevalidation(
      cartItems,
      shippingId
    );

    // if (summary.total.value !== total)
    //   throw new Error(
    //     "Cart summary mismatch. Please refresh the page and try again."
    //   );

    const { id, client_secret } = await stripe.paymentIntents.create({
      amount: Math.round(summary.total.value * 100),
      currency: "gbp",
    });

    if (!client_secret)
      throw new Error(
        "Failed to create payment intent. Please refresh the page and try again."
      );

    const order_items = {
      stripe_id: id,
      items_ref: cart.map(
        ({
          pid,
          qty,
          fid,
          description,
          discount_amount,
          discount_pct,
          price,
          amount,
        }) => ({
          product_ref: pid,
          filament_ref: fid,
          description: description,
          quantity: qty,
          price_at_sale: price!,
          discount: discount_amount,
          discount_pct,
          amount,
        })
      ),
      shipping_ref: shippingId === -1 ? undefined : shippingId,
      subtotal: summary.subtotal.value,
      discount: summary.discount.value,
      shipping: summary.shipping.value,
      tax: summary.tax.value,
      total: summary.total.value,
    };

    console.log("[actionStripePaymentHandler]", order_items);

    await CMS_Orders.createItem(order_items);

    return {
      clientSecret: client_secret,
      clientId: id,
    };
  } catch (err: any) {
    console.error("[actionStripePaymentHandler]", err);
    return { error: { message: err.message } };
  }
}
