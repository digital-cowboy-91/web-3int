import { TProduct } from "@/app/api/_cms/items/products";
import ButtonDropdown from "@/app/components/ButtonDropdown";
import { CSSButtonOutline, CSSLinkOutline } from "@/app/styles";
import Link from "next/link";
import { useState } from "react";

export default function BuyingOptions({ products }: { products: TProduct[] }) {
  const [index, setIndex] = useState(0);

  let { id, price } = products[index];

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-inline items-center gap-2">
        Get{" "}
        <ButtonDropdown
          options={products.map(({ title }) => title)}
          activeIndex={index}
          setActiveIndex={(i) => setIndex(i)}
        />{" "}
        for <strong>{price > 0 ? "£" + price : "FREE"}</strong>
      </div>
      {price > 0 ? (
        <Link
          className={`${CSSButtonOutline} bg-success text-dark`}
          href={"/checkout/" + id}
          rel="noopener noreferrer"
          target="_blank"
        >
          Checkout
        </Link>
      ) : (
        <a
          className={`${CSSButtonOutline} bg-success text-dark`}
          href={"/api/download?pid=" + id}
          download
        >
          Download
        </a>
        // <button
        //   className={`${CSSButtonOutline} bg-success text-dark`}
        //   onClick={async () =>
        //     await fetch("/api/download?pid=" + id).then((res) => res.blob())
        //   }
        // >
        //   Download
        // </button>
      )}
    </div>
  );
}
