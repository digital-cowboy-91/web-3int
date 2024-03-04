import { ReactNode } from "react";
import { CSSContainer } from "../styles";
import CartSummary from "./components/CartSummary";
import StripeWrapper from "./checkout/components/StripeWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StripeWrapper>
      <section id="gallery-detail">
        <div className={`${CSSContainer} my-8`}>
          <h1 className="text-3xl font-bold mb-8">Cart</h1>
          <div className="cart--wrapper">
            {children}
            <CartSummary />
          </div>
        </div>
      </section>
    </StripeWrapper>
  );
}
