import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { composeCartItem } from "../lib/composeCartItem";

export const SCartLocalItem = z.object({
  pid: z.string().uuid(),
  qty: z.number().min(1),
  fid: z.number().optional(),
});

export type TCartLocalItem = z.infer<typeof SCartLocalItem>;

export type TCartItem = {
  pid: string;
  title: string;
  description: string;
  qty: number;
  amount: number;
  discount_amount: number;
  discount_pct: number;
  fid?: number;
  cid: string;
  downloadable: boolean;
};

type TStore = {
  cart: TCartItem[];
  addCartItem: (
    productId: string,
    quantity?: number,
    filamentId?: number
  ) => void;
  updateCartItem: (
    index: number,
    quantity?: number,
    filamentId?: number
  ) => void;
  removeCartItem: (index: number) => void;
};

export const useCartStore = create<TStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addCartItem: async (productId, quantity = 1, filamentId = undefined) => {
        let item = await composeCartItem(productId, quantity, filamentId);

        if (!item) return;

        set({ cart: [...get().cart, item] });
      },
      updateCartItem: async (index, quantity, filamentId) => {
        let cart = [...get().cart];
        let { pid, qty, fid } = cart[index];

        let updatedItem = await composeCartItem(
          pid,
          quantity || qty,
          filamentId || fid
        );

        if (!updatedItem) return;

        cart[index] = updatedItem;

        set({ cart });
      },
      removeCartItem: (index) => {
        let cart = [...get().cart];
        cart.splice(index, 1);
        set({ cart });
      },
    }),
    {
      version: 1,
      name: "cart",
    }
  )
);
