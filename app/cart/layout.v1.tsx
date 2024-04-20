import { CSSContainer } from "@/app/styles";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import StripeWrapper from "./checkout/components/StripeWrapper";
import CartSummary from "./components/CartSummary";

export const metadata: Metadata = {
  title: "Cart & Checkout",
  description:
    "Manage items you are about to purchase, select shipping and pay using your preferred payment method.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StripeWrapper>
      <section id="gallery-detail">
        <div className={`${CSSContainer} my-8`}>
          <div className="cart--wrapper">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
              <CartSummary />
            </Suspense>
          </div>
        </div>
      </section>
    </StripeWrapper>
  );
}
