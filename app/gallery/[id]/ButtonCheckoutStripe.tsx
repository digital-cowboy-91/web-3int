"use client";

import { TProduct } from "@/app/api/_cms/items/products";
import { ReactNode, use, useEffect, useState } from "react";
import actionCheckoutStripe from "./actionCheckoutStripe";

type Props = {
  product: TProduct;
  children: ReactNode;
};

export default function ButtonCheckoutStripe({ product, children }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function clickHandler() {
    setIsLoading(true);
    try {
      window.open(await actionCheckoutStripe(product), "_blank");
    } catch (err: any) {
      console.log(err.message);
    }

    setIsLoading(false);
  }

  return (
    <button
      className="btn-outline-success"
      onClick={clickHandler}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
