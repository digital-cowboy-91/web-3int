import StripePaymentForm from "./components/StripePaymentForm";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Checkout</h1>
      <StripePaymentForm />
    </div>
  );
}
