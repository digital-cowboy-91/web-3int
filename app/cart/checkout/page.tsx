"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "../components/Cart.store";
import StripePaymentForm from "./components/StripePaymentForm";
import { useStripeStore } from "./lib/stripe.store";

export default function Page() {
  const cart = useCartStore((s) => s.cart);
  const cartLastUpdate = useCartStore((s) => s._updatedAt);

  const stripeLatUpdate = useStripeStore((s) => s._updatedAt);
  const isLoading = useStripeStore((s) => s.isLoading);
  const handleIntent = useStripeStore((s) => s.handleIntent);

  useEffect(() => {
    if (cartLastUpdate !== stripeLatUpdate) {
      handleIntent();
    }
  }, [cartLastUpdate, stripeLatUpdate]);

  if (cart.length === 0) {
    redirect("/cart");
  }

  if (isLoading || stripeLatUpdate === 0) {
    return <div>Loading...</div>;
  }

  return <StripePaymentForm />;
}
