"use client";

import Action from "@/app/components/Actions/Action";
import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import useStripePaymentHandler from "../checkout/lib/useStripePaymentHandler";
import { useCartStore } from "./Cart.store";

export function PaymentOptions() {
  const cartStatus = useCartStore((s) => s.status);

  const { isLoading, addressRequired, handleSubmit } =
    useStripePaymentHandler();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="content-wrapper__l2">
      {cartStatus === "open" && (
        <>
          <ExpressCheckoutElement
            options={{
              buttonHeight: 40,
              layout: {
                maxColumns: 1,
                overflow: "never",
              },
            }}
            onConfirm={(e) => {
              handleSubmit(e);
            }}
            onClick={({ resolve }) => {
              const options = {
                emailRequired: true,
                ...(addressRequired && {
                  shippingAddressRequired: true,
                  allowedShippingCountries: ["GB"],
                  shippingRates: [
                    {
                      id: "0",
                      displayName: "Shipping included",
                      amount: 0,
                    },
                  ],
                }),
              };
              resolve(options);
            }}
          />
          <Action
            as="link"
            href="/cart/checkout"
            label="Pay By Card"
            style={{ width: "100%" }}
          />
        </>
      )}
      {cartStatus === "pending" && (
        <Action
          as="button"
          label="Order & Pay"
          form="payment-form"
          type="submit"
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}
