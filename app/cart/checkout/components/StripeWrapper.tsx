"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";
import { useStripeStore } from "../lib/stripe.store";

const pub_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
const stripe = loadStripe(pub_key);

export default function StripeWrapper({ children }: { children: ReactNode }) {
  const clientSecret = useStripeStore((s) => s.clientSecret);

  if (!clientSecret) return children;

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
      }}
    >
      {children}
    </Elements>
  );
}
