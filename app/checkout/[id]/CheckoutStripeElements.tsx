"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutStripeElements() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    console.log("Submit payment form");
  }

  return (
    <div className="grid grid-cols-3">
      <form id="payment-form" onSubmit={handleSubmit} className="col-start-3">
        <PaymentElement
          id="payment-element"
          options={{ layout: "accordion" }}
        />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="btn-outline-success mt-4 w-full text-center"
        >
          <span id="button-text" className="mx-auto">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
