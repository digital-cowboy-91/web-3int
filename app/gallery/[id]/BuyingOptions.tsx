import { TProduct } from "@/app/api/_cms/items/products";
import ButtonDropdown from "@/app/components/ButtonDropdown";
import { CSSLinkOutline, TWButton, TWButtonColour } from "@/app/styles";
import {
  ArrowDownTrayIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

const linkClass = `${CSSLinkOutline} bg-success flex items-center gap-2`;

export default function BuyingOptions({ products }: { products: TProduct[] }) {
  const [index, setIndex] = useState(0);

  let { id, price } = products[index];

  return (
    <div className="w-full flex items-center justify-between">
      <span>Get</span>
      <ButtonDropdown
        options={products.map(({ title }) => title)}
        activeIndex={index}
        setActiveIndex={(i) => setIndex(i)}
      />
      <span>for</span>
      {price > 0 ? (
        <Link
          className="link-outline-success"
          href={"/checkout/" + id}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{"£" + price}</span>
          <ShoppingBagIcon className="size-4" />
        </Link>
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
