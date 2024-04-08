"use client";

import { TShipping } from "@/app/api/_cms/collections/shipping";
import { useEffect } from "react";
import { create } from "zustand";
import asCurrency from "../../lib/asCurrency";
import { useCartStore } from "./Cart.store";

type TStore = {
  id: string | undefined;
  amount: number;
  setShipping: (id: string | undefined, amount: number) => void;
};

export const useShippingStore = create<TStore>((set) => ({
  id: undefined,
  amount: 0,
  setShipping: (id, amount) => set({ id, amount }),
}));

export default function ShippingItems({ methods }: { methods: TShipping[] }) {
  const cart = useCartStore((s) => s.cart);
  const cartStatus = useCartStore((s) => s.status);

  const setShipping = useShippingStore((s) => s.setShipping);

  const disabled =
    !cart.length || cart.findIndex(({ is_digital }) => !is_digital) === -1;

  useEffect(() => {
    if (disabled) {
      setShipping(undefined, 0);
    } else {
      setShipping(methods[0].id, methods[0].price);
    }
  }, [disabled]);

  return methods.map(({ id, title, description, price }, index) => (
    <div key={id} className="grid grid-cols-[1.5rem_minmax(0,_1fr)]">
      <input
        className="size-4 my-auto"
        id={id}
        type="radio"
        name="shipping"
        onChange={(e) => {
          e.currentTarget.checked && setShipping(id, price);
        }}
        defaultChecked={index === 0 && !disabled}
        disabled={disabled || cartStatus !== "open"}
      />
      <label className="font-bold" htmlFor={id}>
        {title} · {price ? asCurrency(price) : "Free"}
      </label>
      {description && (
        <span className="text-xs col-start-2">{description}</span>
      )}
    </div>
  ));
}
