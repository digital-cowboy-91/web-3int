import CartItems from "./components/CartItems";
import StatusBanner from "./components/StatusBanner";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Cart</h1>
      <StatusBanner />
      <div className="grow">
        <CartItems />
      </div>
    </div>
  );
}
