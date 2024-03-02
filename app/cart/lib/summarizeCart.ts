import { TCartItem } from "../components/Cart.store";

function round(number: number) {
  return Math.round(number * 100) / 100;
}
export function summarizeCart(cart: TCartItem[], shippingAmount: number) {
  let subtotal = 0;
  let discount = 0;

  for (let i of cart) {
    subtotal += i.amount;
    discount += i.discount_amount;
  }

  let total = subtotal + shippingAmount;

  return {
    subtotal: { title: "Subtotal", value: round(subtotal) },
    discount: { title: "Discount", value: round(discount) },
    shipping: { title: "Shipping", value: round(shippingAmount) },
    tax: { title: "Tax", value: round(total * 0.21) },
    total: { title: "Total", value: round(total) },
  };
}
