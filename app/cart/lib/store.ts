import { TFilament } from "@/app/api/_cms/items/filaments";
import { TDiscount, TProduct } from "@/app/api/_cms/items/products";
import { z } from "zod";
import { create } from "zustand";
import actionGetProduct from "./actionGetProduct";

type TCartItem = {
  product: TProduct;
  quantity: number;
  amount: number;
  discount: number;
  fid?: number;
};

const SLocalCartItem = z.object({
  pid: z.string().uuid(),
  quantity: z.number().min(1),
  fid: z.number().optional(),
});

type TStore = {
  cart: TCartItem[];
  total: number;
  isLoading: boolean;
  addCartItem: (product: TProduct) => void;
  updateCartItem: (index: number, quantity?: number, fid?: number) => void;
  removeCartItem: (index: number) => void;
  loadCart: () => void;
};

export const useCartStore = create<TStore>((set) => ({
  cart: [],
  total: 0,
  isLoading: true,
  addCartItem: (product) =>
    set((s) => {
      let cart = s.cart;

      if (
        cart.findIndex(
          (i) => i.product.id === product.id && product.downloadable
        ) > -1
      )
        return { cart };

      cart.push({
        product,
        quantity: 1,
        amount: product.price,
        discount: 0,
        fid:
          product.filament_rels && product.filament_rels.length > 0
            ? product.filament_rels[0].filament_rel.id
            : undefined,
      });

      let total = recalculateCart(cart);
      safeCart(cart);

      return { cart, total };
    }),
  updateCartItem: (index, quantity, fid) =>
    set((s) => {
      let cart = s.cart;
      let thisItem = cart[index];

      let total = s.total;

      if (quantity) {
        thisItem.quantity = quantity;
        thisItem.discount = getDiscount(thisItem.product.discounts, quantity);
        thisItem.amount =
          (thisItem.product.price * quantity * (100 - thisItem.discount)) / 100;
        total = recalculateCart(cart);
      }

      if (fid) thisItem.fid = fid;

      safeCart(cart);

      return { cart, total };
    }),
  removeCartItem: (index) =>
    set((s) => {
      let cart = s.cart;
      cart.splice(index, 1);

      let total = recalculateCart(cart);

      safeCart(cart);

      return { cart, total };
    }),
  loadCart: async () => {
    set({ isLoading: true });
    let localCart = localStorage.getItem("cart");

    if (!localCart) return [];

    let parsedCart = z.array(SLocalCartItem).parse(JSON.parse(localCart));

    let cart: TCartItem[] = [];
    for (let i of parsedCart) {
      let product: TProduct = await actionGetProduct(i.pid)
        .then((p) => JSON.parse(p))
        .catch((e) => console.log(e));

      if (!product) continue;

      let quantity = 1;
      let discount = 0;
      let amount = product.price;
      let fid = undefined;

      if (!product.downloadable) {
        if (product.filament_rels.length > 0) {
          let fidIndex = product.filament_rels.findIndex(
            ({ filament_rel: f }) => f.id === i.fid
          );

          fidIndex = fidIndex > -1 ? fidIndex : 0;

          fid = product.filament_rels[fidIndex].filament_rel.id;
        }

        if (i.quantity > 1) {
          quantity = i.quantity;
          discount = getDiscount(product.discounts, quantity);
          amount = (product.price * quantity * (100 - discount)) / 100;
        }
      }

      cart.push({
        product,
        quantity,
        amount,
        discount,
        fid,
      });
    }

    let total = recalculateCart(cart);

    set({ cart, total, isLoading: false });
  },
}));

function getDiscount(discounts: TDiscount[], quantity: number) {
  let sorted = discounts.sort((first, last) => last.quantity - first.quantity);
  let match = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;

  return match;
}

function recalculateCart(cart: TCartItem[]) {
  let total = 0;

  for (let i of cart) {
    total += i.amount;
  }

  return total;
}

function safeCart(cart: TCartItem[]) {
  localStorage.setItem(
    "cart",
    JSON.stringify(
      cart.map(({ product, quantity, fid }) => ({
        pid: product.id,
        quantity: quantity,
        fid,
      }))
    )
  );
}
