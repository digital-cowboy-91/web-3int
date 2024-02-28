"use client";

import {
  Elements,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "../../lib/store";

const pub_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
const stripe = loadStripe(pub_key);

export default function StripeElementsWrapper() {
  const [clientSecret, setClientSecret] = useState<string | undefined | null>(
    null
  );

  useEffect(() => {
    async function getSecret() {
      let secret = await useCartStore.getState().checkout();

      setClientSecret(secret);
    }

    getSecret();
  }, []);

  if (clientSecret === null) return <p>Loading...</p>;
  if (clientSecret === undefined) redirect("/cart");

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
      }}
    >
      <form className="w-[500px] mx-auto p-4 flex flex-col gap-8">
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
        <LinkAuthenticationElement />
        {/* <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["GB"],
            display: {
              name: "split",
            },
          }}
        /> */}
        <PaymentElement />
      </form>
    </Elements>
  );
}
