"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import asCurrency from "../../lib/asCurrency";
import { useCartStore } from "./Cart.store";
import QuantitySelector from "./QuantitySelector";
import "./CartItems.v2.style.css";

export default function CartItems() {
  const paramStatus = useSearchParams().get("status");

  const cart = useCartStore((s) => s.cart);

  const updateCartItem = useCartStore((s) => s.updateCartItem);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const revalidateCart = useCartStore((s) => s.revalidateCart);
  const purgeCart = useCartStore((s) => s.purgeCart);

  useEffect(() => {
    if (paramStatus === "success") {
      return purgeCart();
    }

    revalidateCart();
  }, []);

  return (
    <ul className="list--highlight-odd g__py">
      {cart.map(
        (
          { title, cid, description, qty, amount, discount_pct, is_digital },
          index
        ) => (
          <li className="cart-item" key={index}>
            <div className="image">
              <img src={`/media/${cid}?key=h100`} alt={title} />
            </div>
            <div className="cart-item__detail">
              <span>{title}</span>
              <span>{description}</span>
            </div>
            <div className="cart-item__quantity">
              <QuantitySelector
                value={qty}
                disableIncrease={is_digital}
                handleChange={(value) => {
                  console.log(value);
                  if (value === 0) return removeCartItem(index);
                  updateCartItem(index, value);
                }}
              />
            </div>
            <div className="cart-item__total">{asCurrency(amount)}</div>
            {Boolean(discount_pct) && (
              <div className="cart-item__discount">- {discount_pct}%</div>
            )}
          </li>
        )
      )}
    </ul>
  );
}
