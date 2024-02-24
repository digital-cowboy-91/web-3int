"use client";

import { setCartItem } from "@/app/cart/lib/cart";
import { useRouter } from "next/navigation";
import { ReactNode, use, useEffect, useState } from "react";

function localCart() {
  let cart = localStorage.getItem("cart");

  if (!cart) return [];

  return JSON.parse(cart);
}

type Props = {
  pid: string;
  children: ReactNode;
};

export default function ByttonAddToCart({ pid, children }: Props) {
  const [inCart, setInCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!inCart) return;

    const countdown = setTimeout(() => {
      setInCart(false);
    }, 3000);

    return () => {
      clearTimeout(countdown);
    };
  }, [inCart]);

  return (
    <button
      className="btn-outline-success"
      onClick={() => {
        if (inCart) {
          router.push("/cart");
        }

        setCartItem({ id: pid, quantity: 1 });

        setInCart(true);
      }}
    >
      {inCart ? "Go to cart" : children}
    </button>
  );
}
