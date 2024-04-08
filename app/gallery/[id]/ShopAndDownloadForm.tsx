"use client";

import { TProduct } from "@/app/api/_cms/collections/products";
import { Fragment } from "react";

export default function ShopAndDownloadForm({
  products,
}: {
  products: TProduct[];
}) {
  console.log(products);

  return (
    <form>
      {products.map(({ id, title }) => (
        <Fragment key={id}>
          <input id={id} type="radio" name="product" value={id} />
          <label htmlFor={id}>{title}</label>
        </Fragment>
      ))}
    </form>
  );
}
