"use client";

import { ButtonDropdown_v2 } from "@/app/components/ButtonDropdown";
import { useCartStore } from "../lib/store";
import Shipping from "./Shipping";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

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
        {cart.map(({ product, quantity, amount, discount, fid }, index) => (
          <div className="cart--items--row" key={index}>
            <div className="col-image">
              <img
                className="object-cover"
                src={`/media/${product.gallery_rel.cover_image}?key=h100`}
                alt={product.gallery_rel.title}
              />
            </div>
            <div className="col-detail">
              <span className="font-semibold">{product.gallery_rel.title}</span>
              <span className="text-xs">
                {product.title + (product.downloadable ? " digital file" : "")}
              </span>
            </div>
            <div className="col-quantity">
              <button
                onClick={() => {
                  if (quantity === 1) {
                    removeCartItem(index);
                  } else {
                    updateCartItem(index, quantity - 1);
                  }
                }}
                className="text-primary"
              >
                <MinusCircleIcon className="size-6" />
              </button>

              {quantity}
              <button
                onClick={() => updateCartItem(index, quantity + 1)}
                disabled={product.downloadable}
                className="enabled:text-primary disabled:text-gray-200"
              >
                <PlusCircleIcon className="size-6" />
              </button>
            </div>
            <div className="col-filament">
              {!product.downloadable && (
                <ButtonDropdown_v2
                  id={product.id + "_" + index}
                  label="Filament"
                  defaultSelected={fid?.toString()}
                  options={product.filament_rels.map(
                    ({ filament_rel: { id, material, colour, cosmetic } }) => ({
                      option: material + ", " + colour + " " + cosmetic,
                      value: id.toString(),
                    })
                  )}
                  onSelect={(index) => {
                    console.log(index);
                  }}
                  className="w-full"
                />
              )}
            </div>

            <div className="col-total">£ {amount}</div>

            {Boolean(discount) && <div className="discount">- {discount}%</div>}
          </div>
        ))}
      </div>
      <div className="cart--summary">
        <h2>Shipping method</h2>
        <Shipping />
        <div className="summary">
          {summary.map(({ title, value }, index) => (
            <div key={index}>
              <span>{title}</span>
              <span>£ {value}</span>
            </div>
          ))}
        </div>
        <button>Checkout</button>
      </div>
    </div>
  );
}
