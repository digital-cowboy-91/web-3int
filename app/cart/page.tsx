"use client";

import { useCartStore } from "./components/Cart.store";
import CartEmpty from "./components/CartEmpty";
import CartItems from "./components/CartItems";

export default function Page() {
  const cartStatus = useCartStore((s) => s.status);

  console.log(cartStatus);

  return (
    <div className="flex flex-col gap-8">
      <div className="grow">
        <h1 className="text-3xl font-bold">Cart</h1>
        {(!cartStatus || cartStatus === "open") && <CartItems />}
        {cartStatus === "empty" && <CartEmpty />}
        {cartStatus === "closed" && <CartEmpty />}
      </div>
    </div>
  );
}
