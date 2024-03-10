import { PaymentOptions } from "./PaymentOptions";
import SummaryItems from "./SummaryItems";

export default function SummaryBlock() {
  return (
    <div>
      <h2>Summary</h2>
      <SummaryItems />
      <PaymentOptions />
    </div>
  );
}
