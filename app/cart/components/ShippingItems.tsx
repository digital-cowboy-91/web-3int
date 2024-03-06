"use client";

import { TShipping } from "@/app/api/_cms/items/store/shipping";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";
import { useCartStore } from "./Cart.store";

type TStore = {
  id: number;
  amount: number;
  setShipping: (id: number, amount: number) => void;
};

export const useShippingStore = create<TStore>((set) => ({
  id: -1,
  amount: 0,
  setShipping: (id: number, amount: number) => set({ id, amount }),
}));

export default function ShippingItems({ methods }: { methods: TShipping[] }) {
  const cart = useCartStore((s) => s.cart);
  const cartStatus = useCartStore((s) => s.status);

  const setShipping = useShippingStore((s) => s.setShipping);

  const shippingRequired =
    cart.findIndex(({ downloadable }) => !downloadable) !== -1;

  useEffect(() => {
    setShipping(methods[0].id, methods[0].price);
  }, []);

  useEffect(() => {
    if (!shippingRequired) {
      setShipping(-1, 0);
    }
  }, [shippingRequired]);

  return methods.map(({ id, title, description, price }, index) => (
    <div key={id} className="grid grid-cols-[1.5rem_minmax(0,_1fr)]">
      <input
        className="size-4 my-auto"
        id={id.toString()}
        type="radio"
        name="shipping"
        onChange={(e) => {
          e.currentTarget.checked && setShipping(id, price);
        }}
        defaultChecked={index === 0}
        disabled={
          !shippingRequired ||
          [undefined, "empty", "pending"].includes(cartStatus)
        }
      />
      <label className="font-semibold" htmlFor={id.toString()}>
        {title} · {price ? "£ " + price : "Free"}
      </label>
      {description && (
        <span className="text-xs col-start-2">{description}</span>
      )}
    </div>
  ));
}
