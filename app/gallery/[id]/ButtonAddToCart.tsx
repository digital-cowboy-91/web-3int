"use client";

import { TProduct } from "@/app/api/_cms/collections/products";
import { useCartStore } from "@/app/cart/components/Cart.store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  product: TProduct;
  quantity?: number;
  filamentId?: number;
  children: ReactNode;
  className?: string;
};

export default function ButtonAddToCart({
  product,
  quantity = 1,
  filamentId,
  children,
  className = "",
}: Props) {
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
      className={`btn-outline-success ${className}`}
      onClick={() => {
        if (inProgress) {
          router.push("/cart");
        } else {
          addCartItem(product, quantity, filamentId);
          setInProgress(true);
        }
      }}
    >
      {inProgress ? "Go to cart" : children}
    </button>
  );
}
