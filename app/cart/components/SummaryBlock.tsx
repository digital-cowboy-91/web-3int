import ShippingBlock from "./ShippingBlock";
import { SummaryButtons } from "./SummaryButtons";
import SummaryItems from "./SummaryItems";

export default function SummaryBlock() {
  return (
    <div>
      <h2>Summary</h2>
      <SummaryItems />
      <SummaryButtons />
    </div>
  );
}