"use client";

import { TProduct } from "@/app/api/_cms/items/products";
import { setCartItem } from "@/app/cart/lib/cart";
import { useCartStore } from "@/app/cart/lib/store";
import { useRouter } from "next/navigation";
import { ReactNode, use, useEffect, useState } from "react";

type Props = {
  product: TProduct;
  children: ReactNode;
};

export default function ButtonAddToCart({ product, children }: Props) {
  const [inProgress, setInProgress] = useState(false);
  const router = useRouter();

  const addCartItem = useCartStore((s) => s.addCartItem);

  useEffect(() => {
    if (!inProgress) return;

    const countdown = setTimeout(() => {
      setInProgress(false);
    }, 3000);

    return () => {
      clearTimeout(countdown);
    };
  }, [inProgress]);

  return (
    <button
      className="btn-outline-success"
      onClick={() => {
        if (inProgress) {
          router.push("/cart");
        } else {
          addCartItem(product);
          setInProgress(true);
        }
      }}
    >
      {inProgress ? "Go to cart" : children}
    </button>
  );
}
