import Link from "next/link";

export default function LinkToCart() {
  return (
    <Link href="/cart" className="link-underlined-white">
      Cart
    </Link>
  );
}
