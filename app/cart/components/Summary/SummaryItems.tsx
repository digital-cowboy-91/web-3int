"use client";

import { useElements } from "@stripe/react-stripe-js";
import asCurrency from "../../../lib/asCurrency";
import { summarizeCart } from "../../lib/summarizeCart";
import { useCartStore } from "../Cart.store";
import { useShippingStore } from "./ShippingItems";
import { Fragment } from "react";

export default function SummaryItems() {
  const cart = useCartStore((s) => s.cart);
  const shipping = useShippingStore((s) => s.amount);

  let summary = summarizeCart(cart, shipping);

  const elements = useElements();

  elements?.update({
    amount: summary.total.value === 0 ? 50 : summary.total.value,
  });

  return (
    <>
      <ul className="content-wrapper__l3 list--spread">
        {Object.entries(summary).map(([key, { title, value }]) => {
          if (key === "total") return;
          return (
            <li key={key}>
              <strong>{title}</strong>
              <span>{asCurrency(value)}</span>
            </li>
          );
        })}
      </ul>
      <hr />
      <ul className="list--spread">
        <li>
          <strong>{summary.total.title}</strong>
          <span className="font-black">{asCurrency(summary.total.value)}</span>
        </li>
      </ul>
    </>
  );
}
