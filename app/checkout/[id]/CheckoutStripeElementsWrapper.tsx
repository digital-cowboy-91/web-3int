"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutStripeElements from "./CheckoutStripeElements";

export default function CheckoutStripeElementsWrapper({
  clientSecret,
  pub_key,
}: {
  clientSecret: string;
  pub_key: string;
}) {
  const stripePromise = loadStripe(pub_key);

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
      stripe={stripePromise}
    >
      <CheckoutStripeElements />
    </Elements>
  );
}
