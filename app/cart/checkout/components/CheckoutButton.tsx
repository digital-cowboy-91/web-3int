"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStripeStore } from "../lib/stripe.store";

export function CheckoutButton() {
  const router = useRouter();
  const clientSecret = useStripeStore((s) => s.clientSecret);
  const isLoading = useStripeStore((s) => s.isLoading);
  const handleIntent = useStripeStore((s) => s.handleIntent);

  useEffect(() => {
    if (clientSecret) {
      router.push("/cart/checkout");
    }
  }, [clientSecret]);

  return (
    <button onClick={handleIntent} disabled={isLoading}>
      Checkout
    </button>
  );
}
