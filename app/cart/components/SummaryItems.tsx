"use client";

import { useElements } from "@stripe/react-stripe-js";
import { summarizeCart } from "../lib/summarizeCart";
import { useCartStore } from "./Cart.store";
import { useShippingStore } from "./ShippingItems";

export default function SummaryItems() {
  const cart = useCartStore((s) => s.cart);
  const shipping = useShippingStore((s) => s.amount);

  let summary = summarizeCart(cart, shipping);

  const elements = useElements();

  elements?.update({
    amount:
      summary.total.value === 0 ? 50 : Math.round(summary.total.value * 100),
  });

  return (
    <div className="summaries">
      {Object.entries(summary).map(([key, { title, value }]) => (
        <div key={key}>
          <span>{title}</span>
          <span>£ {value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}
