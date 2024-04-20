import ShippingBlock from "./Summary/ShippingBlock";
import SummaryBlock from "./Summary/SummaryBlock";

export default function CartSummary() {
  return (
    <div className="cart--summary">
      <ShippingBlock />
      <SummaryBlock />
    </div>
  );
}
