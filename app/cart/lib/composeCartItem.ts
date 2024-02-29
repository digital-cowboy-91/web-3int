"use server";

import { CMS_Products, TProduct } from "@/app/api/_cms/items/store/products";
import { calculateItemPrice } from "./calculateItemPrice";
import { retrieveFilamentTitle } from "./composeFilamentTitle";
import composeDescription from "./composeDescription";

export async function composeCartItem(
  productId: string,
  quantity: number = 1,
  filamentId?: number
) {
  let product = await CMS_Products.readItem(productId);

  if (!product) return;

  const { title, price, discounts, gallery_rel, filament_rels, downloadable } =
    product;

  let amounts = calculateItemPrice(price, quantity, discounts);

  let filamentTitle = retrieveFilamentTitle(
    filament_rels.map((rel) => rel.filament_rel),
    filamentId
  );

  let description = composeDescription(
    title,
    quantity,
    downloadable,
    filamentTitle
  );

  return {
    pid: productId,
    title: gallery_rel.title,
    description,
    qty: quantity,
    ...amounts,
    fid: filamentId,
    cid: gallery_rel.cover_image,
    downloadable,
  };
}
