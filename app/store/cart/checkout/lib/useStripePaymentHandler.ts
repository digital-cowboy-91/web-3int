"use client";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCartStore } from "../../components/Cart.store";
import { useShippingStore } from "../../components/Summary/ShippingItems";
import { actionStripePaymentHandler } from "./actionStripePaymentHandler";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { verifyCaptchaAction } from "@/app/lib/verifyCaptchaAction";

const host = process.env.NEXT_PUBLIC__WEB_PUBLIC_URL;
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

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    setAddressRequired(cart.findIndex(({ is_digital }) => !is_digital) !== -1);
  }, [cart]);

  useEffect(() => {
    setIsReady(Boolean(stripe) && Boolean(elements));
  }, [stripe, elements]);

  function handleError(err: any) {
    setIsLoading(false);
    setErrorMsg(err.message);
    console.error("[useStripePaymentHandler]", err);
  }
  async function handleSubmit(
    e: StripeExpressCheckoutElementConfirmEvent | FormEvent<HTMLFormElement>
  ) {
    if ("preventDefault" in e) {
      e.preventDefault();
    }

    setIsLoading(true);

    if (!executeRecaptcha) {
      throw new Error("Recaptcha not initialized");
    }
    const token = await executeRecaptcha("payment_form");
    const verified = await verifyCaptchaAction(token);

    if (!verified) {
      throw new Error("Captcha verification failed");
    }

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
        return_url: host + "/store/cart?status=success",
      },
      redirect: "if_required",
    });

    if (error) {
      handleError(error);
      return;
    }

    setIsLoading(false);
    router.replace("/store/cart?status=success");
  }

  return {
    isLoading,
    isReady,
    errorMsg,
    addressRequired,
    handleSubmit,
  };
}
