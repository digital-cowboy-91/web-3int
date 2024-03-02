import ShippingBlock from "./ShippingBlock";
import { SummaryButtons } from "./SummaryButtons";
import SummaryItems from "./SummaryItems";

export default function SummaryBlock() {
  return (
    <div className="cart--summary">
      <div>
        <h2>Shipping methods</h2>
        <ShippingBlock />
      </div>
      <div>
        <h2>Summary</h2>
        <SummaryItems />
        <SummaryButtons />
      </div>
    </div>
  );
}
