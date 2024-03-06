"use client";

import { useEffect } from "react";
import { useCartStore } from "./Cart.store";
import QuantitySelector from "./QuantitySelector";

export default function CartItems() {
  const cart = useCartStore((s) => s.cart);

  const updateCartItem = useCartStore((s) => s.updateCartItem);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const revalidateCart = useCartStore((s) => s.revalidateCart);

  useEffect(() => {
    revalidateCart();
  }, []);

  return (
    <div className="cart--items">
      {cart.map(
        (
          { title, cid, description, qty, amount, discount_pct, downloadable },
          index
        ) => (
          <div className="cart--items--row" key={index}>
            <div className="image">
              <img src={`/media/${cid}?key=h100`} alt={title} />
            </div>
            <div className="detail">
              <span>{title}</span>
              <span>{description}</span>
            </div>
            <div className="qunatity">
              <QuantitySelector
                value={qty}
                disableIncrease={downloadable}
                handleChange={(value) => {
                  if (value === 0) return removeCartItem(index);
                  updateCartItem(index, value);
                }}
              />
            </div>
            <div className="total">£ {amount}</div>
            {Boolean(discount_pct) && (
              <div className="discount">- {discount_pct}%</div>
            )}
          </div>
        )
      )}
    </div>
  );
}
