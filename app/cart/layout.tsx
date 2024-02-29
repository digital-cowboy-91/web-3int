import { ReactNode } from "react";
import { CSSContainer } from "../styles";
import SummaryBlock from "./components/SummaryBlock";
import StripeWrapper from "./checkout/components/StripeWrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8`}>
        <h1 className="text-3xl font-bold mb-8">Cart</h1>
        {/* <StripeWrapper> */}
        <div className="cart--wrapper">
          {children}
          <SummaryBlock />
        </div>
        {/* </StripeWrapper> */}
      </div>
    </section>
  );
}
