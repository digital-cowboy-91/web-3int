import ShippingBlock from "./ShippingBlock";
import SummaryBlock from "./SummaryBlock";

export default function CartSummary() {
  return (
    <div className="cart--summary">
      <ShippingBlock />
      <SummaryBlock />
    </div>
  );
}
