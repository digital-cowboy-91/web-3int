"use client";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function StripePaymentForm() {
  return (
    <form className="w-[500px] mx-auto p-4 flex flex-col gap-8">
      <LinkAuthenticationElement />
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["GB"],
          display: {
            name: "split",
          },
        }}
      />
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
    </form>
  );
}
