"use client";

import {
  AddressElement,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function StripePaymentForm() {
  return (
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
      <button type="submit" className="btn-outline-success flex justify-center">
        Order & Pay
      </button>
    </form>
  );
}
