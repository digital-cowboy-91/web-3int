import { TProduct } from "@/app/api/_cms/collections/products";
import { calculateItemPrice } from "./calculateItemPrice";
import composeDescription from "./composeDescription";
import { retrieveFilamentTitle } from "./composeFilamentTitle";

export function composeCartItem(
  product: TProduct,
  quantity: number = 1,
  filamentId?: string
) {
  const {
    discounts,
    is_digital,
    filament_refs,
    gallery_ref,
    id,
    price,
    title,
  } = product;

  let amounts = calculateItemPrice(price, quantity, discounts);

  let filamentTitle = retrieveFilamentTitle(
    filament_refs.map((rel) => rel.filament_ref),
    filamentId
  );

  let description = composeDescription(
    title,
    quantity,
    is_digital,
    filamentTitle
  );

  return {
    ...amounts,
    price,
    cid: gallery_ref.cover_image,
    description,
    is_digital,
    fid: filamentId,
    pid: id,
    qty: quantity,
    title: gallery_ref.title,
  };
}
