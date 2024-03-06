import { ReactNode, Suspense } from "react";
import { CSSContainer } from "../styles";
import StripeWrapper from "./checkout/components/StripeWrapper";
import CartSummary from "./components/CartSummary";

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
