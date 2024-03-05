"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStatusParam from "../lib/useStatusParam";
import { useCartStore } from "./Cart.store";
import CartEmpty from "./CartEmpty";
import QuantitySelector from "./QuantitySelector";
import Link from "next/link";
import StatusBanner from "./StatusBanner";

export default function CartItems() {
  const { status } = useStatusParam();
  const router = useRouter();

  const cart = useCartStore((s) => s.cart);
  const isLoading = useCartStore((s) => s.isLoading);

  const updateCartItem = useCartStore((s) => s.updateCartItem);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const revalidateCart = useCartStore((s) => s.revalidateCart);
  const purgeCart = useCartStore((s) => s.purgeCart);

  useEffect(() => {
    revalidateCart();
  }, []);

  useEffect(() => {
    if (status === "success") {
      purgeCart();
    } else if (cart.length && status === "empty") {
      router.replace("/cart?status=");
    } else if (!cart.length && status !== "empty") {
      router.replace("/cart?status=empty");
    }
  }, [status]);

  return cart.length === 0 ? (
    <CartEmpty />
  ) : (
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
