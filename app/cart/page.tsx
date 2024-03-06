"use client";

import { useCartStore } from "./components/Cart.store";
import CartEmpty from "./components/CartEmpty";
import CartItems from "./components/CartItems";

export default function Page() {
  const cartStatus = useCartStore((s) => s.status);

  return (
    <div className="flex flex-col gap-8">
      <div className="grow">
        <h1 className="text-3xl font-bold">Cart</h1>
        {[undefined, "open", "pending"].includes(cartStatus) && <CartItems />}
        {cartStatus === "empty" && (
          <CartEmpty type="cross" message="Cart is empty" />
        )}
        {cartStatus === "closed" && (
          <CartEmpty type="check" message="Thank you for your order!" />
        )}
      </div>
    </div>
  );
}
