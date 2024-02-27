"use client";

import { useEffect } from "react";
import { useCartStore } from "../lib/store";
import Link from "next/link";

export default function LinkToCart() {
  const initialCart = useCartStore((s) => s.initialize);

  useEffect(() => {
    initialCart();
  }, []);

  return (
    <Link href="/cart" className="link-underlined-white">
      Cart
    </Link>
  );
}
