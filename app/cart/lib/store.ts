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
  title: "Subtotal" | "Total" | "Tax" | "Shipping";
  value: number;
};

type TStore = {
  // CART
  cart: TCartItem[];
  addCartItem: (product: TProduct, quantity?: number, fid?: number) => void;
  updateCartItem: (index: number, quantity?: number, fid?: number) => void;
  removeCartItem: (index: number) => void;
  calculateItemPrice: (
    price: number,
    quantity: number,
    discounts: TDiscount[]
  ) => { amount: number; discount: number };
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
  addCartItem: (product, quantity = 1, filamentId) => {
    set((s) => {
      let cart = s.cart;

      if (
        cart.findIndex(
          (i) => i.product.id === product.id && product.downloadable
        ) > -1
      )
        return { cart };

      let { amount, discount } = s.calculateItemPrice(
        product.price,
        quantity,
        product.discounts
      );
      let fid =
        filamentId ||
        (product.filament_rels && product.filament_rels.length > 0
          ? product.filament_rels[0].filament_rel.id
          : undefined);

      cart.push({
        product,
        quantity,
        amount,
        discount,
        fid,
      });

      safeCart(cart);

      return { cart };
    });

    useCartStore.getState().recalculate();
  },
  updateCartItem: (index, quantity, filamentId) => {
    set((s) => {
      let cart = s.cart;
      let thisItem = cart[index];

      if (quantity) {
        let { amount, discount } = s.calculateItemPrice(
          thisItem.product.price,
          quantity,
          thisItem.product.discounts
        );

        thisItem.quantity = quantity;
        thisItem.amount = amount;
        thisItem.discount = discount;
      }

      if (filamentId) thisItem.fid = filamentId;

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
  calculateItemPrice: (price, quantity, discounts) => {
    let discount = 0;

    if (discounts.length > 0) {
      let sorted = discounts.sort(
        (first, last) => last.quantity - first.quantity
      );
      discount = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;
    }

    let amount = (price * quantity * (100 - discount)) / 100;

    return { amount, discount };
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
      let shipping = shipping_method!.price;
      let total = subtotal + shipping_method!.price;
      let tax = round(total * 0.21);

      let summary: TSummary[] = [
        { title: "Subtotal", value: subtotal },
        { title: "Shipping", value: shipping },
        { title: "Tax", value: tax },
        { title: "Total", value: total },
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

      let quantity = i.quantity || 1;
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
          let calc = useCartStore
            .getState()
            .calculateItemPrice(product.price, quantity, product.discounts);
          discount = calc.discount;
          amount = calc.amount;
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
