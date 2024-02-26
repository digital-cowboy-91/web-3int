"use client";

import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { ButtonDropdown_v2 } from "../components/ButtonDropdown";
import { CSSContainer } from "../styles";
import { useCartStore } from "./lib/store";

export default function Page() {
  const { cart, total, isLoading, updateCartItem, removeCartItem, loadCart } =
    useCartStore();

  useEffect(() => {
    if (cart.length === 0) loadCart();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-4 md:p-8`}>
        <h1 className="text-3xl font-bold mb-8">Cart</h1>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div className="cart-grid">
            <div className="cart-grid--header">
              <div className="col-4">Quantity</div>
              <div className="col-5">Unit price</div>
              <div className="col-6">Subtotal</div>
            </div>
            {cart.map(({ product, quantity, amount, discount, fid }, index) => (
              <div className="cart-grid--row" key={index}>
                <div className="col-1">
                  <span className="font-semibold">
                    {product.gallery_rel.title}
                  </span>

                  <span className="text-xs">
                    {product.title +
                      (product.downloadable ? " digital file" : "")}
                  </span>
                </div>
                <div className="col-2">
                  <img
                    className="object-cover"
                    src={`/media/${product.gallery_rel.cover_image}?key=h100`}
                    alt={product.gallery_rel.title}
                  />
                </div>
                <div className="col-3">
                  {!product.downloadable && (
                    <ButtonDropdown_v2
                      id={product.id + "_" + index}
                      label="Filament"
                      defaultSelected={fid?.toString()}
                      options={product.filament_rels.map(
                        ({
                          filament_rel: { id, material, colour, cosmetic },
                        }) => ({
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
                <div className="col-4">
                  <button
                    onClick={() => {
                      if (quantity === 1) {
                        removeCartItem(index);
                      } else {
                        updateCartItem(index, quantity - 1);
                      }
                    }}
                    className="text-green-600"
                  >
                    <MinusCircleIcon className="size-8" />
                  </button>

                  {quantity}
                  <button
                    onClick={() => updateCartItem(index, quantity + 1)}
                    disabled={product.downloadable}
                    className="enabled:text-green-600 disabled:text-gray-200"
                  >
                    <PlusCircleIcon className="size-8" />
                  </button>
                </div>
                <div className="col-5">£ {product.price}</div>
                <div className="col-6">£ {amount}</div>
                {Boolean(discount) && (
                  <div className="discount">- {discount}%</div>
                )}
              </div>
            ))}
            <div className="cart-grid--row">
              <div className="col-3">
                <ButtonDropdown_v2
                  id={"delivery"}
                  label="Delivery"
                  defaultSelected="royal_mail"
                  options={[
                    { option: "Collect, Warrington", value: "collect" },
                    { option: "Royal Mail", value: "royal_mail" },
                  ]}
                  onSelect={(index) => {
                    console.log(index);
                  }}
                  className="w-full"
                />
              </div>
              <div className="col-6">£ #</div>
            </div>
            <div className="cart-grid--footer">
              <button className="btn-outline-success ">
                <div>Total</div>
                <div>£ {total}</div>
                <ArrowRightCircleIcon className="size-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
