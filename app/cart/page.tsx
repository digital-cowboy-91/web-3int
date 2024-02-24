"use client";

import { useEffect, useState } from "react";
import { CSSContainer } from "../styles";
import { TCart, getCart } from "./lib/cart";

export default function Page() {
  const [cart, setCart] = useState<TCart[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  if (!cart) return <div>Cart is empty</div>;

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-4 md:p-8`}>
        <h1 className="text-3xl font-bold mb-8">Cart</h1>
        <div className="grid grid-cols-1 gap-4">
          {cart.map((item) => (
            <div key={item.id} className="grid grid-cols-3 gap-4">
              <div className="col-span-2">{item.id}</div>
              <div>{item.quantity}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
