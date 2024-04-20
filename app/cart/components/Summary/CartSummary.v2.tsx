import ShippingBlock from "./ShippingBlock";
import SummaryBlock from "./SummaryBlock";
import "./CartSummary.v2.style.css";
import { PaymentOptions } from "../PaymentOptions";

export default function CartSummary() {
  return (
    <div className="cart content-wrapper">
      <ShippingBlock />
      <hr />
      <SummaryBlock />
      <PaymentOptions />
    </div>
  );
}
