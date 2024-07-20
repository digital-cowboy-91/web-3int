"use client";

import { useCartStore } from "./components/Cart.store";
import CartEmpty from "./components/CartEmpty";
import CartItems from "./components/CartItems.v2";

export default function Page() {
  const cartStatus = useCartStore((s) => s.status);

  return (
    <div className="flex flex-col g__gap">
      {[undefined, "open", "pending"].includes(cartStatus) && <CartItems />}
      {cartStatus === "empty" && (
        <CartEmpty type="cross" message="Cart is empty" />
      )}
      {cartStatus === "closed" && (
        <CartEmpty type="check" message="Thank you for your order!" />
      )}
    </div>
  );
}
