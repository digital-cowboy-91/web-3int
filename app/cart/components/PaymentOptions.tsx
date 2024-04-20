"use client";

import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import useStripePaymentHandler from "../checkout/lib/useStripePaymentHandler";
import { useCartStore } from "./Cart.store";

const path = "/cart/checkout";

export function PaymentOptions() {
  const cartStatus = useCartStore((s) => s.status);

  const { isLoading, addressRequired, handleSubmit } =
    useStripePaymentHandler();

  if (cartStatus !== "open") return null;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="content-wrapper__l2">
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
      {/* TODO: Merge branches before change */}
      <Link
        href={path}
        className="flex justify-center items-center h-[40px] p-2 bg-primary text-white rounded-[0.25rem] font-bold"
      >
        PAY BY CARD
      </Link>
    </div>
  );
}
