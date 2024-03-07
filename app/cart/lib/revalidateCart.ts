import CMSProductsReadItems_server from "@/app/api/_cms/collections/products/readItems.server";
import { TCache, TCartItem } from "../components/Cart.store";
import { composeCacheObject } from "./composeCacheObject";
import { composeCartItem } from "./composeCartItem";

export type TCartItemSimple = {
  pid: string;
  qty: number;
  fid?: number;
};

export async function revalidateCart(
  cart: TCartItem[] | TCartItemSimple[],
  cache: TCache = {}
) {
  // 1. Determine stale products
  const now = Date.now();
  const staleProductIds = cart
    .filter(({ pid }) => {
      let product = cache[pid];

      if (!product) return true;
      if (product.staleTime - now <= 0) return true;
      return false;
    })
    .map(({ pid }) => pid);

  // 2. Refresh cache
  if (staleProductIds.length) {
    const products = await CMSProductsReadItems_server(staleProductIds);

    products.forEach(
      (p) => (cache = { ...cache, ...composeCacheObject(p.id, p) })
    );
  }

  // 3. Update cart
  const newCart = cart
    .map(({ pid, qty, fid }) => {
      const product = cache[pid].value;
      return product && composeCartItem(product, qty, fid);
    })
    .filter((item) => item) as TCartItem[];

  // 4. Update store
  return { cart: newCart, cache, products: cache };
}
