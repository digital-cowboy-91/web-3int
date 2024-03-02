"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "./Cart.store";

const path = "/cart/checkout";

export function SummaryButtons() {
  const pathname = usePathname();
  const router = useRouter();

  const cart = useCartStore((s) => s.cart);

  if (pathname === path) return null;

  return (
    <button onClick={() => router.push(path)} disabled={!cart.length}>
      Checkout
    </button>
  );
}
