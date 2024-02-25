"use client";

import { CSSContainer } from "../styles";
import { useCartStore } from "./lib/store";

export default function Page() {
  const { cart, total, updateCartItem, removeCartItem } = useCartStore();

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-4 md:p-8`}>
        <h1 className="text-3xl font-bold mb-8">Cart</h1>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {cart.map(
              ({ product, quantity, amount, discount, filament }, index) => (
                <div key={index} className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    {product.gallery_rel.title}, {product.title}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        if (quantity === 1) {
                          removeCartItem(index);
                        } else {
                          updateCartItem(index, quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>

                    {quantity}
                    <button
                      onClick={() => updateCartItem(index, quantity + 1)}
                      disabled={product.downloadable}
                    >
                      +
                    </button>
                  </div>
                  <div>{amount}</div>
                  <div>{discount}</div>
                </div>
              )
            )}
          </div>
        )}
        <div className="mt-8">Total: £{total.toFixed(2)}</div>
      </div>
    </section>
  );
}
