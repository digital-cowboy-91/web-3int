"use client";

import {
  AddressElement,
  Elements,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useStripeStore } from "../lib/stripe.store";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const pub_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
const stripe = loadStripe(pub_key);

export default function StripePaymentForm() {
  const [isLoading, setIsLoading] = useState(true);
  const clientSecret = useStripeStore((s) => s.clientSecret);
  const addressRequired = useStripeStore((s) => s.addressRequired);

  function handleSubmit() {}

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
        loader: "never",
        mode: "setup",
      }}
    >
      <form className="w-full max-w-[500px] mx-auto p-4 flex flex-col gap-8">
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
        <div className="text-center">- OR -</div>
        <LinkAuthenticationElement />
        {addressRequired && (
          <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["GB"],
              display: {
                name: "split",
              },
            }}
          />
        )}
        <PaymentElement
          options={{
            layout: {
              type: "accordion",
              defaultCollapsed: false,
              radios: false,
              spacedAccordionItems: true,
            },
          }}
          onReady={() => {
            setIsLoading(false);
          }}
        />
        <div>
          <button type="submit" className="ms-auto btn-outline-success">
            Order & Pay
          </button>
        </div>
      </form>
    </Elements>
  );
}
