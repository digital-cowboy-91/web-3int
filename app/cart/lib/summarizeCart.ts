import { TCartItem } from "../components/Cart.store";

export function summarizeCart(cart: TCartItem[], shipping: number) {
  let subtotal = 0;
  let discount = 0;

  for (let i of cart) {
    subtotal += i.amount;
    discount += i.discount_amount;
  }

  let total = subtotal - discount + shipping;

  return [
    { title: "Subtotal", value: subtotal },
    { title: "Discount", value: discount },
    { title: "Shipping", value: shipping },
    { title: "Tax", value: total * 0.21 },
    { title: "Total", value: total },
  ];
}
