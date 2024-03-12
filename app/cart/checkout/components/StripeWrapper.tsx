"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

const pub_key = process.env.NEXT_PUBLIC__STRIPE_PUBLIC_KEY!;
const stripePromise = loadStripe(pub_key);

export default function StripeWrapper({ children }: { children: ReactNode }) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        loader: "never",
        mode: "payment",
        currency: "gbp",
        amount: 50,
      }}
    >
      {children}
    </Elements>
  );
}
