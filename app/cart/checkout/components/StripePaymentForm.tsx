"use client";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useCartStore } from "../../components/Cart.store";
import MessageBanner from "../../components/MessageBanner";
import useStripePaymentHandler from "../lib/useStripePaymentHandler";

export default function StripePaymentForm() {
  const { isLoading, isReady, errorMsg, addressRequired, handleSubmit } =
    useStripePaymentHandler();

  useEffect(() => {
    useCartStore.setState({ status: "pending" });
  }, []);

  return (
    <form
      className="w-full max-w-[500px] mx-auto p-4 flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      {errorMsg && <MessageBanner type="error" text={errorMsg} />}
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
