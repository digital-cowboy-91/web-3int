import { ReactNode, Suspense } from "react";
import { CSSContainer } from "../styles";
import CartSummary from "./components/CartSummary";
import StripeWrapper from "./checkout/components/StripeWrapper";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StripeWrapper>
      <section id="gallery-detail">
        <div className={`${CSSContainer} my-8`}>
          <div className="space-x-4">
            <Link href={"?status=empty"}>empty</Link>
            <Link href={"?status=success"}>success</Link>
            <Link href={"?status=error"}>error</Link>
            <Link
              href={"?status=error&msg=Your%20card%20has%20been%20declined."}
            >
              error w msg
            </Link>
          </div>
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
