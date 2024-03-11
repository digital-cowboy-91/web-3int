import { TCartItem } from "../components/Cart.store";

export function summarizeCart(cart: TCartItem[], shippingAmount: number) {
  let subtotal = 0;
  let discount = 0;

  for (let i of cart) {
    subtotal += i.amount;
    discount += i.discount_amount;
  }

  let total = subtotal + shippingAmount;

  return {
    subtotal: { title: "Subtotal", value: subtotal },
    discount: { title: "Discount", value: discount },
    shipping: { title: "Shipping", value: shippingAmount },
    tax: { title: "Tax", value: Math.round(total * 0.21) },
    total: { title: "Total", value: total },
  };
}
