"use client";

import { useElements } from "@stripe/react-stripe-js";
import asCurrency from "../../lib/asCurrency";
import { summarizeCart } from "../lib/summarizeCart";
import { useCartStore } from "./Cart.store";
import { useShippingStore } from "./ShippingItems";

export default function SummaryItems() {
  const cart = useCartStore((s) => s.cart);
  const shipping = useShippingStore((s) => s.amount);

  let summary = summarizeCart(cart, shipping);

  const elements = useElements();

  elements?.update({
    amount: summary.total.value === 0 ? 50 : summary.total.value,
  });

  return (
    <div className="summaries">
      {Object.entries(summary).map(([key, { title, value }]) => (
        <div key={key}>
          <span>{title}</span>
          <span>{asCurrency(value)}</span>
        </div>
      ))}
    </div>
  );
}
