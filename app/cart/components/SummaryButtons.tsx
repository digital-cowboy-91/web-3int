"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SummaryButtons() {
  const pathname = usePathname();

  if (pathname === "/cart/checkout") return null;

  return <Link href={"/cart/checkout"}>Checkout</Link>;
}
