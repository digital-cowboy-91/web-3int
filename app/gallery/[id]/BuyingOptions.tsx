import { TProduct } from "@/app/api/_cms/items/products";
import ButtonDropdown, {
  ButtonDropdown_v2,
} from "@/app/components/ButtonDropdown";
import {
  ArrowDownTrayIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ButtonAddToCart from "./ButtonAddToCart";

export default function BuyingOptions({ products }: { products: TProduct[] }) {
  const [pid, setPid] = useState<string>(products[0].id);

  let selectedProduct = products.find((p) => p.id === pid)!;
  let { id, price } = selectedProduct;

  return (
    <div className="w-full flex items-center justify-between">
      <span>Get</span>
      <ButtonDropdown_v2
        id="buying-options"
        defaultSelected={pid}
        options={products.map(({ id, title }) => ({
          option: title,
          value: id,
        }))}
        onSelect={(value) => setPid(value)}
      />
      <span>for</span>
      {price > 0 ? (
        <ButtonAddToCart product={selectedProduct}>
          <span>{"£" + price}</span>
          <ShoppingCartIcon className="size-4" />
        </ButtonAddToCart>
      ) : (
        <a
          className="link-outline-success"
          href={"/api/download?pid=" + id}
          download
        >
          <span>Free</span>
          <ArrowDownTrayIcon className="size-4" />
        </a>
      )}
    </div>
  );
}
