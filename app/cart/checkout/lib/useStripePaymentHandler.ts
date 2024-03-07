"use client";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCartStore } from "../../components/Cart.store";
import { useShippingStore } from "../../components/ShippingItems";
import { actionStripePaymentHandler } from "./actionStripePaymentHandler";

const host = process.env.NEXT_PUBLIC_WEB_HOST;
export default function useStripePaymentHandler() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [addressRequired, setAddressRequired] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const cart = useCartStore((s) => s.cart);
  const shippingId = useShippingStore((s) => s.id);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setAddressRequired(
      cart.findIndex(({ downloadable }) => !downloadable) !== -1
    );
  }, [cart]);

  useEffect(() => {
    setIsReady(Boolean(stripe) && Boolean(elements));
  }, [stripe, elements]);

  function handleError(err: any) {
    setIsLoading(false);
    setErrorMsg(err.message);
    console.log("[useStripePaymentHandler]", err);
  }
  async function handleSubmit(
    e: StripeExpressCheckoutElementConfirmEvent | FormEvent<HTMLFormElement>
  ) {
    if ("preventDefault" in e) {
      e.preventDefault();
    }

    setIsLoading(true);

    if (!stripe || !elements) {
      const errorMessage =
        "Stripe is not ready. Please refresh the page and try again.";
      handleError({ message: errorMessage });
      return;
    }

    const { error: submitError } = await elements?.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const simpleCart = cart?.map(({ pid, qty, fid }) => ({ pid, qty, fid }));

    const res = await actionStripePaymentHandler(simpleCart, shippingId);

    if (res.error) {
      handleError({ message: res.error.message });
      return;
    }

    if (!res.clientSecret) {
      const errorMessage =
        "Communication error between client and server. Please refresh the page and try again.";
      handleError({ message: errorMessage });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: res.clientSecret,
      confirmParams: {
        return_url: host + "/cart?status=success",
      },
      redirect: "if_required",
    });

    if (error) {
      handleError(error);
      return;
    }

    setIsLoading(false);
    router.replace("/cart?status=success");
  }

  return {
    isLoading,
    isReady,
    errorMsg,
    addressRequired,
    handleSubmit,
  };
}
