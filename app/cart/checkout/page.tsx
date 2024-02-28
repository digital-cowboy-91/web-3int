import { useCartStore } from "../lib/store";
import StripePaymentForm from "./components/StripePaymentForm";

export default async function Page() {
  useCartStore.getState().updateIntent();

  return <StripePaymentForm />;
}
