import { TDiscount, TProduct } from "@/app/api/_cms/items/store/products";
import { TShipping } from "@/app/api/_cms/items/store/shipping";
import { z } from "zod";
import { create } from "zustand";
import actionGetProduct from "./actionGetProduct";
import actionGetShipping from "./actionGetShipping";

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

type TSummary = {
  title: "Subtotal" | "Total" | "Tax";
  value: number;
};

type TStore = {
  // CART
  cart: TCartItem[];
  addCartItem: (product: TProduct) => void;
  updateCartItem: (index: number, quantity?: number, fid?: number) => void;
  removeCartItem: (index: number) => void;
  // SHIPPING
  shipping_id: number | undefined;
  shipping_methods: TShipping[];
  updateShippingId: (id: number) => void;
  // SUMMARY
  summary: TSummary[];
  recalculate: () => void;
  // INIT
  isLoading: boolean;
  initialize: () => void;
};

export const useCartStore = create<TStore>((set) => ({
  // CART
  cart: [],
  addCartItem: (product) => {
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

      safeCart(cart);

      return { cart };
    });
    useCartStore.getState().recalculate();
  },
  updateCartItem: (index, quantity, fid) => {
    set((s) => {
      let cart = s.cart;
      let thisItem = cart[index];

      if (quantity) {
        thisItem.quantity = quantity;
        thisItem.discount = getDiscount(thisItem.product.discounts, quantity);
        thisItem.amount =
          (thisItem.product.price * quantity * (100 - thisItem.discount)) / 100;
      }

      if (fid) thisItem.fid = fid;

      safeCart(cart);

      return { cart };
    });
    useCartStore.getState().recalculate();
  },
  removeCartItem: (index) => {
    set((s) => {
      let cart = s.cart;
      cart.splice(index, 1);

      safeCart(cart);

      return { cart };
    });
    useCartStore.getState().recalculate();
  },

  // SHIPPING
  shipping_id: undefined,
  shipping_methods: [],
  updateShippingId: (id) => {
    set({ shipping_id: id });
    useCartStore.getState().recalculate();
  },
  // SUMMARY
  summary: [],
  recalculate: () =>
    set((s) => {
      const shipping_method = s.shipping_methods.find(
        (m) => m.id === s.shipping_id
      );

      function round(number: number) {
        return Math.round(number * 100) / 100;
      }

      function recalculateCart(cart: TCartItem[]) {
        let total = 0;

        for (let i of cart) {
          total += i.amount;
        }

        return round(total);
      }

      let subtotal = recalculateCart(s.cart);
      let total = subtotal + shipping_method!.price;
      let tax = round(total * 0.21);

      let summary: TSummary[] = [
        { title: "Subtotal", value: subtotal },
        { title: "Total", value: total },
        { title: "Tax", value: tax },
      ];

      return { summary };
    }),
  isLoading: true,
  initialize: async () => {
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

    let methods = await actionGetShipping()
      .then((res) => JSON.parse(res) as TShipping[])
      .catch((e) => console.log(e));

    if (!methods) return;

    set({
      cart,
      shipping_methods: methods,
      shipping_id: methods[0].id,
      isLoading: false,
    });
    useCartStore.getState().recalculate();
  },
}));

function getDiscount(discounts: TDiscount[], quantity: number) {
  let sorted = discounts.sort((first, last) => last.quantity - first.quantity);
  let match = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;

  return match;
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
