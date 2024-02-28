"use client";

import { useCartStore } from "../lib/store";
import QuantitySelector from "./QuantitySelector";

export default function Cart() {
  const isLoading = useCartStore((s) => s.isLoading);

  const cart = useCartStore((s) => s.cart);
  const updateCartItem = useCartStore((s) => s.updateCartItem);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  console.log(cart);

  if (isLoading) return <div>Loading...</div>;

  return cart.length === 0 ? (
    <div>Cart is empty</div>
  ) : (
    <div className="cart--items">
      {cart.map(
        ({ product, description, quantity, amount, discount, fid }, index) => (
          <div className="cart--items--row" key={index}>
            <div className="image">
              <img
                src={`/media/${product.gallery_rel.cover_image}?key=h100`}
                alt={product.gallery_rel.title}
              />
            </div>
            <div className="detail">
              <span>{product.gallery_rel.title}</span>
              <span>{description}</span>
            </div>
            <div className="quantity">
              <QuantitySelector
                value={quantity}
                disableIncrease={product.downloadable}
                handleChange={(value) => {
                  if (value === 0) return removeCartItem(index);
                  updateCartItem(index, value);
                }}
              />
            </div>
            <div className="total">£ {amount}</div>
            {Boolean(discount) && <div className="discount">- {discount}%</div>}
          </div>
        )
      )}
    </div>
  );
}
