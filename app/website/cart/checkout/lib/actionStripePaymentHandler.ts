"use server";

import Stripe from "stripe";
import { TCartItemSimple, revalidateCart } from "../../lib/revalidateCart";
import { summarizeCart } from "../../lib/summarizeCart";
import { CMSShipping } from "@/app/api/_cms/collections/shipping";
import { CMSOrders } from "@/app/api/_cms/collections/orders";

const secret_key = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(secret_key);

export async function serverCartRevalidation(
  cartItems: TCartItemSimple[],
  shippingId: string | undefined
) {
  let cartData = await revalidateCart(cartItems);
  if (!cartData) {
    console.error("No revalidation data");
    throw new Error("No revalidation data");
  }

  let { cart, products } = cartData;
  if (!cart || cart.length === 0) {
    console.error("Cart is empty");
    throw new Error("Cart is empty");
  }

  let shippingPrice = 0;
  if (shippingId) {
    let res = await CMSShipping.readItem(shippingId);

    if (!res) {
      console.error("No shipping found");
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
  shippingId: string | undefined
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
      amount: summary.total.value,
      currency: "gbp",
    });

    if (!client_secret)
      throw new Error(
        "Failed to create payment intent. Please refresh the page and try again."
      );

    const order_items = {
      discount: summary.discount.value,
      item_refs: cart.map(
        ({
          amount,
          description,
          discount_amount,
          discount_pct,
          fid,
          pid,
          price,
          qty,
        }) => ({
          amount,
          description: description,
          discount_pct,
          discount: discount_amount,
          filament_ref: fid,
          price_at_sale: price!,
          product_ref: pid,
          quantity: qty,
        })
      ),
      payment_intent_id: id,
      shipping_ref: shippingId,
      shipping: summary.shipping.value,
      subtotal: summary.subtotal.value,
      tax: summary.tax.value,
      total: summary.total.value,
    };

    await CMSOrders.createItem(order_items);

    return {
      clientSecret: client_secret,
      clientId: id,
    };
  } catch (err: any) {
    console.error("[actionStripePaymentHandler]", err);
    return { error: { message: err.message } };
  }
}
