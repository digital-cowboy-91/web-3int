"use client";

import Link from "next/link";

export default function LinkToCart() {
  // const initialCart = useCartStore((s) => s.initialize);

  // useEffect(() => {
  //   initialCart();
  // }, []);

  return (
    <Link href="/cart" className="link-underlined-white">
      Cart
    </Link>
  );
}
