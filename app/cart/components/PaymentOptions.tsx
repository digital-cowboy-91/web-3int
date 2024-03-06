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

  if ([undefined, "empty", "pending"].includes(cartStatus)) return null;

  if (isLoading) return <div>Loading...</div>;

  return (
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

      <div className="relative text-center border-t-[1px] border-dark border-opacity-20">
        <div className="absolute inset-x-0 -top-2.5 ">
          <span className="bg-success-light px-2">OR</span>
        </div>
      </div>

      <Link
        href={path}
        className="flex justify-center items-center h-[40px] p-2 bg-primary text-white rounded-[0.25rem] font-semibold"
      >
        PAY BY CARD
      </Link>
    </>
  );
}
