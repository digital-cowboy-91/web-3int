import { TFilament } from "@/app/api/_cms/items/filaments";
import { TDiscount, TProduct } from "@/app/api/_cms/items/products";
import { create } from "zustand";

type TCart = {
  product: TProduct;
  quantity: number;
  amount: number;
  discount: number;
  filament?: TFilament;
};

type TStore = {
  cart: TCart[];
  total: number;
  addCartItem: (product: TProduct) => void;
  updateCartItem: (
    index: number,
    quantity?: number,
    filament?: TFilament
  ) => void;
  removeCartItem: (index: number) => void;
  recalculateCart: (cart: TCart[]) => void;
};

export const useCartStore = create<TStore>((set) => ({
  cart: [],
  total: 0,
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
        filament: !product.filament_rels || product.filament_rels[0],
      });

      s.recalculateCart(cart);

      return { cart };
    }),
  updateCartItem: (index, quantity, filament) =>
    set((s) => {
      let cart = s.cart;
      let thisItem = cart[index];

      if (quantity) {
        thisItem.quantity = quantity;
        thisItem.discount = getDiscount(thisItem.product.discounts, quantity);
        thisItem.amount =
          (thisItem.product.price * quantity * (100 - thisItem.discount)) / 100;
        s.recalculateCart(cart);
      }

      if (filament) thisItem.filament = filament;

      return { cart };
    }),
  removeCartItem: (index) =>
    set((s) => {
      let cart = s.cart;
      cart.splice(index, 1);
      s.recalculateCart(cart);
      return { cart };
    }),
  recalculateCart: (cart) =>
    set((s) => {
      let total = 0;

      for (let i of cart) {
        total += i.amount;
      }

      return { total };
    }),
}));

function getDiscount(discounts: TDiscount[], quantity: number) {
  let sorted = discounts.sort((first, last) => last.quantity - first.quantity);
  let match = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;

  return match;
}
