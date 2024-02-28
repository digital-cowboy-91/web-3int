"use client";

import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "../lib/store";
import Shipping from "./Shipping";

export default function SummaryBlock() {
  const pathname = usePathname();

  const isLoading = useCartStore((s) => s.isLoading);
  const summary = useCartStore((s) => s.summary);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="cart--summary">
      <div>
        <h2>Shipping method</h2>
        <Shipping />
      </div>
      <div>
        <h2>Summary</h2>
        <div className="summaries">
          {summary.map(({ title, value }, index) => (
            <div key={index}>
              <span>{title}</span>
              <span>£ {value}</span>
            </div>
          ))}
        </div>
        {pathname.endsWith("checkout") ? (
          <>
            <button>Order & Pay</button>
            <ExpressCheckoutElement
              options={{
                buttonType: {
                  applePay: "buy",
                  googlePay: "buy",
                },
              }}
              onConfirm={() => {
                console.log("confirmed");
              }}
            />
          </>
        ) : (
          <Link href="/cart/checkout">Checkout</Link>
        )}
      </div>
    </div>
  );
}
