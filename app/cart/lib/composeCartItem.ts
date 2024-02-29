import { TProduct } from "@/app/api/_cms/items/store/products";
import { calculateItemPrice } from "./calculateItemPrice";
import { retrieveFilamentTitle } from "./composeFilamentTitle";
import composeDescription from "./composeDescription";

export function composeCartItem(
  product: TProduct,
  quantity: number = 1,
  filamentId?: number
) {
  let price = calculateItemPrice(product.price, quantity, product.discounts);

  let filament = retrieveFilamentTitle({
    list: product.filament_rels.map((rel) => rel.filament_rel),
    id: filamentId,
  });

  let description = composeDescription(
    product.title,
    quantity,
    product.downloadable,
    filament
  );

  return {
    product,
    description,
    quantity,
    ...price,
    fid: filamentId,
  };
}
