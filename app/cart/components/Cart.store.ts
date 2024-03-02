import { TProduct } from "@/app/api/_cms/items/store/products";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { composeCacheObject } from "../lib/composeCacheObject";
import { composeCartItem } from "../lib/composeCartItem";
import { revalidateCart } from "../lib/revalidateCart";

export type TCartItem = {
  amount: number;
  cid: string;
  description: string;
  discount_amount: number;
  discount_pct: number;
  downloadable: boolean;
  fid?: number;
  pid: string;
  price?: number;
  qty: number;
  title: string;
};

export type TCache = {
  [key: string]: {
    value: any;
    staleTime: number;
  };
};

type TStore = {
  cart: TCartItem[];
  isLoading: boolean | number;
  addCartItem: (
    product: TProduct,
    quantity?: number,
    filamentId?: number
  ) => void;
  updateCartItem: (
    index: number,
    quantity?: number,
    filamentId?: number
  ) => void;
  removeCartItem: (index: number) => void;
  revalidateCart: () => Promise<void>;
  _updatedAt: number;
  _cache: TCache;
};

export const useCartStore = create<TStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        cart: [],
        isLoading: false,
        addCartItem: (product, quantity = 1, filamentId = undefined) => {
          const { cart, _cache } = get();
          let item = composeCartItem(product, quantity, filamentId);

          set({
            cart: [...cart, item],
            _cache: { ..._cache, ...composeCacheObject("product.id", product) },
            _updatedAt: Date.now(),
          });
        },
        updateCartItem: (index, quantity, filamentId) => {
          const { cart, _cache } = get();
          const { pid, qty, fid } = cart[index];

          let product = _cache[pid].value;

          if (!product) return;

          let newCart = [...cart];
          newCart[index] = composeCartItem(
            product,
            quantity || qty,
            filamentId || fid
          );

          set({ cart: newCart, _updatedAt: Date.now() });
        },
        removeCartItem: (index) => {
          let cart = [...get().cart];
          cart.splice(index, 1);
          set({ cart, _updatedAt: Date.now() });
        },
        revalidateCart: async () => {
          const { cart, _cache } = get();
          set({ isLoading: true });
          const res = await revalidateCart(cart, _cache);

          if (!res) return set({ isLoading: false });

          set({ ...res, isLoading: false, _updatedAt: Date.now() });
        },
        _updatedAt: 0,
        _cache: {},
      }),
      {
        version: 1,
        name: "cart",
        partialize: ({ cart }) => ({ cart }),
      }
    )
  )
);
