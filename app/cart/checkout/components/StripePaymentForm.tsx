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
import { useRouter } from "next/navigation";
import Action from "@/app/components/Actions/Action";

export default function StripePaymentForm() {
  const router = useRouter();
  const cartStatus = useCartStore((s) => s.status);

  const shouldRedirect = !["open", "pending"].includes(cartStatus || "");

  const { isLoading, isReady, errorMsg, addressRequired, handleSubmit } =
    useStripePaymentHandler();

  useEffect(() => {
    if (shouldRedirect) {
      return router.replace("/cart");
    }
    useCartStore.setState({ status: "pending" });
  }, []);

  return (
    <form
      id="payment-form"
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
      {/* <div>
        <Action
          as="button"
          label="Order & Pay"
          type="submit"
          disabled={!isReady || isLoading}
          className="float-right"
        />
      </div> */}
    </form>
  );
}
