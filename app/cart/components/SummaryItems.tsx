"use client";

import { summarizeCart } from "../lib/summarizeCart";
import { useCartStore } from "./Cart.store";
import { useShippindStore } from "./ShippingItems";

export default function SummaryItems() {
  const cart = useCartStore((s) => s.cart);
  const shipping = useShippindStore((s) => s.amount);

  let summary = summarizeCart(cart, shipping);

  return (
    <div className="summaries">
      {Object.entries(summary).map(([key, { title, value }]) => (
        <div key={key}>
          <span>{title}</span>
          <span>£ {value}</span>
        </div>
      ))}
    </div>
  );
}
