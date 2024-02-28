"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";
import { useCartStore } from "../../lib/store";

const pub_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
const stripe = loadStripe(pub_key);

export default function StripeWrapper({ children }: { children: ReactNode }) {
  const clientSecret = useCartStore((s) => s.clientSecret);

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
