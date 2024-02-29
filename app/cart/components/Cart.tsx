"use client";

import { TProduct } from "@/app/api/_cms/items/store/products";
import { create } from "zustand";
import { calculateItemPrice } from "../lib/calculateItemPrice";
import composeDescription from "../lib/composeDescription";
import { retrieveFilamentTitle } from "../lib/composeFilamentTitle";
import { composeCartItem } from "../lib/composeCartItem";
import actionGetProduct from "../lib/actionGetProduct";
import { useEffect } from "react";
import { z } from "zod";
import QuantitySelector from "./QuantitySelector";

export const SCartLocalItem = z.object({
  pid: z.string().uuid(),
  quantity: z.number().min(1),
  fid: z.number().optional(),
});

type TCartLocalItem = z.infer<typeof SCartLocalItem>;

export type TCartItem = {
  product: TProduct;
  description: string;
  quantity: number;
  amount: number;
  discount_amount: number;
  discount_pct: number;
  fid?: number;
};

type TStore = {
  cart: TCartItem[];
  addCartItem: (product: TProduct, quantity?: number, fid?: number) => void;
  updateCartItem: (index: number, quantity?: number, fid?: number) => void;
  removeCartItem: (index: number) => void;
  initialize: () => void;
};

export const useCartStore = create<TStore>((set) => ({
  cart: [],
  addCartItem: (product, quantity = 1, filamentId = undefined) =>
    set((s) => {
      let item = composeCartItem(product, quantity, filamentId);

      return { cart: [...s.cart, item] };
    }),
  updateCartItem: (index, quantity, filamentId) =>
    set((s) => {
      let cart = [...s.cart];

      let { product, quantity: qty, fid } = cart[index];
      cart[index] = composeCartItem(
        product,
        quantity || qty,
        filamentId || fid
      );

      return { cart };
    }),
  removeCartItem: (index) =>
    set((s) => {
      let cart = [...s.cart];
      cart.splice(index, 1);
      return { cart };
    }),
  initialize: async () => {
    let localCart = localStorage.getItem("cart");

    if (!localCart) return;

    let parsedCart: TCartLocalItem[] = z
      .array(SCartLocalItem)
      .parse(JSON.parse(localCart));

    let cart = [];

    for (let i of parsedCart) {
      let product: TProduct = await actionGetProduct(i.pid)
        .then((p) => JSON.parse(p))
        .catch((e) => console.log(e));

      if (!product) continue;

      let item = composeCartItem(product, i.quantity, i.fid);

      cart.push(item);
    }

    set({ cart });
  },
}));

export default function Cart() {
  const cart = useCartStore((s) => s.cart);

  const updateCartItem = useCartStore((s) => s.updateCartItem);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  useEffect(() => {
    useCartStore.getState().initialize();
  }, []);

  return cart.length === 0 ? (
    <div>Cart is empty</div>
  ) : (
    <div className="cart--items">
      {cart.map(
        (
          { product, description, quantity, amount, discount_pct, fid },
          index
        ) => (
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
            {Boolean(discount_pct) && (
              <div className="discount">- {discount_pct}%</div>
            )}
          </div>
        )
      )}
    </div>
  );
}
