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

const pub_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
const stripe = loadStripe(pub_key);

export default function StripePaymentForm() {
  const clientSecret = useStripeStore((s) => s.clientSecret);
  const addressRequired = useStripeStore((s) => s.addressRequired);

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
        />
        <button
          type="submit"
          className="btn-outline-success flex justify-center"
        >
          Order & Pay
        </button>
      </form>
    </Elements>
  );
}
