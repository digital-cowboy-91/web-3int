"use client";

import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { usePathname, useRouter } from "next/navigation";
import useStripePaymentHandler from "../checkout/lib/useStripePaymentHandler";
import { useCartStore } from "./Cart.store";

const path = "/cart/checkout";

export function PaymentOptions() {
  const { addressRequired, handleSubmit } = useStripePaymentHandler();

  const pathname = usePathname();
  const router = useRouter();

  const cart = useCartStore((s) => s.cart);

  if (pathname === path) return null;

  return (
    <>
      <ExpressCheckoutElement
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
      <button onClick={() => router.push(path)} disabled={!cart.length}>
        PAY BY CARD
      </button>
    </>
  );
}
