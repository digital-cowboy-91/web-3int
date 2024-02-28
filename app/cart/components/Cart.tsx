"use client";

import Link from "next/link";
import { useCartStore } from "../lib/store";
import QuantitySelector from "./QuantitySelector";
import Shipping from "./Shipping";

export default function Cart() {
  const isLoading = useCartStore((s) => s.isLoading);

  const cart = useCartStore((s) => s.cart);
  const updateCartItem = useCartStore((s) => s.updateCartItem);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const summary = useCartStore((s) => s.summary);

  if (isLoading) return <div>Loading...</div>;

  return cart.length === 0 ? (
    <div>Cart is empty</div>
  ) : (
    <div className="cart--wrapper">
      <div className="cart--items">
        {cart.map(({ product, quantity, amount, discount }, index) => (
          <div className="cart--items--row" key={index}>
            <div className="image">
              <img
                src={`/media/${product.gallery_rel.cover_image}?key=h100`}
                alt={product.gallery_rel.title}
              />
            </div>
            <div className="detail">
              <span>{product.gallery_rel.title}</span>
              <span>
                {product.title +
                  (product.downloadable
                    ? " digital file"
                    : " · PLA, Multicolour Matte")}
              </span>
            </div>
            <div className="quantity">
              <QuantitySelector
                value={quantity}
                disableIncrease={product.downloadable}
                handleChange={(value) => {
                  if (value === 0) return removeCartItem(index);
                  console.log("value", value);
                  updateCartItem(index, value);
                }}
              />
            </div>
            <div className="total">£ {amount}</div>
            {Boolean(discount) && <div className="discount">- {discount}%</div>}
          </div>
        ))}
      </div>
      <div className="cart--summary">
        <div>
          <h2>Shipping method</h2>
          <Shipping />
        </div>
        <div>
          <h2>Summary</h2>
          <div className="summaries">
            {summary.map(({ title, value }, index) => (
              <div key={index}>
                <span>{title}</span>
                <span>£ {value}</span>
              </div>
            ))}
          </div>
          <Link href="/cart/checkout">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
