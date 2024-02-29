"use client";

import { summarizeCart } from "../lib/summarizeCart";
import { useCartStore } from "./Cart.store";
import { useShippindStore } from "./ShippingItems";

function round(number: number) {
  return Math.round(number * 100) / 100;
}

export default function SummaryItems() {
  const cart = useCartStore((s) => s.cart);
  const shipping = useShippindStore((s) => s.amount);

  if (!cart?.length) return null;

  let summary = summarizeCart(cart, shipping);

  return (
    <div className="summaries">
      {summary.map(({ title, value }, index) => (
        <div key={index}>
          <span>{title}</span>
          <span>£ {round(value)}</span>
        </div>
      ))}
    </div>
  );
}
