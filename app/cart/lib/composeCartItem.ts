import { TProduct } from "@/app/api/_cms/items/store/products";
import { calculateItemPrice } from "./calculateItemPrice";
import { retrieveFilamentTitle } from "./composeFilamentTitle";
import composeDescription from "./composeDescription";

export function composeCartItem(
  product: TProduct,
  quantity: number = 1,
  filamentId?: number
) {
  const {
    discounts,
    downloadable,
    filament_rels,
    gallery_rel,
    id,
    price,
    title,
  } = product;
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
    ...amounts,
    cid: gallery_rel.cover_image,
    description,
    downloadable,
    fid: filamentId,
    pid: id,
    qty: quantity,
    title: gallery_rel.title,
  };
}
