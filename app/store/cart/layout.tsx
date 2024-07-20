import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import StripeWrapper from "./checkout/components/StripeWrapper";
import CartSummary from "./components/Summary/CartSummary.v2";
import StepIndicator from "./components/StepIndicator";

export const metadata: Metadata = {
  title: "Cart & Checkout",
  description:
    "Manage items you are about to purchase, select shipping and pay using your preferred payment method.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StripeWrapper>
      <section id="cart-checkout">
        <div className="container md:grid md:grid-cols-[1fr_40%] xl:grid-cols-[1fr_35%] g__gap">
          <StepIndicator className="col-span-2" />
          <Suspense fallback={<div>Loading...</div>}>
            {children}
            <CartSummary />
          </Suspense>
        </div>
      </section>
    </StripeWrapper>
  );
}
