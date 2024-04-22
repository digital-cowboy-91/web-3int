"use client";

import { TShipping } from "@/app/api/_cms/collections/shipping";
import { useEffect } from "react";
import { create } from "zustand";
import asCurrency from "../../../lib/asCurrency";
import { useCartStore } from "../Cart.store";
import Form from "@/app/components/UI/Form/Form";

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
    <Form.Input
      key={id}
      id={`shipping-${100 + index}`}
      name="shipping"
      type="radio"
      value={id}
      label={
        <div className="grid grid-cols-[1fr_min-content]">
          <strong>{title}</strong>
          <span className="uppercase font-black text-right">
            {!price ? "Free" : asCurrency(price)}
          </span>
          {description && (
            <div className="col-span-2 text-xs">{description}</div>
          )}
        </div>
      }
      defaultChecked={index === 0}
      disabled={disabled}
      onClick={() => setShipping(id, price)}
    />
  ));
}
