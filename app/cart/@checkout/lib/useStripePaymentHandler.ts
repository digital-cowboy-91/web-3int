"use client";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useCartStore } from "../../components/Cart.store";
import { useShippingStore } from "../../components/ShippingItems";
import { createPaymentIntent } from "../../checkout/lib/actionStripe";

export default function useStripePaymentHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const [addressRequired, setAddressRequired] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [errorMessage, setErrorMessage] = useState();

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
    setErrorMessage(err.message);
  }
  async function handleSubmit(
    e: StripeExpressCheckoutElementConfirmEvent | FormEvent<HTMLFormElement>
  ) {
    if ("preventDefault" in e) {
      e.preventDefault();
    }

    setIsLoading(true);

    if (!stripe || !elements) {
      return handleError("Stripe is not ready");
    }

    const { error: submitError } = await elements?.submit();

    if (submitError) {
      return handleError(submitError);
    }

    const simpleCart = cart?.map(({ pid, qty, fid }) => ({ pid, qty, fid }));

    const res = await createPaymentIntent(simpleCart, shippingId);

    if (!res) {
      return handleError("Failed to create payment intent");
    }

    const { error } = await stripe!.confirmPayment({
      elements,
      clientSecret: res?.clientSecret,
      confirmParams: {
        return_url: "https://3int.uk/cart/checkout?success=true",
      },
    });

    if (error) {
      return handleError(error);
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    isReady,
    addressRequired,
    errorMessage,
    handleSubmit,
  };
}
