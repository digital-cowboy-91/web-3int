"use client";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useStripe,
} from "@stripe/react-stripe-js";
import useStripePaymentHandler from "../lib/useStripePaymentHandler";
import StatusBanner from "../../components/StatusBanner";

export default function StripePaymentForm() {
  const { isLoading, isReady, addressRequired, handleSubmit } =
    useStripePaymentHandler();

  return (
    <form
      className="w-full max-w-[500px] mx-auto p-4 flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <StatusBanner />
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
      <div>
        <button
          type="submit"
          className="ms-auto btn-outline-success"
          disabled={!isReady || isLoading}
        >
          Order & Pay
        </button>
      </div>
    </form>
  );
}
