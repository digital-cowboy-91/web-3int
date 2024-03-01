import { TCache, TCartItem } from "../components/Cart.store";
import { actionGetProducts } from "./actionGetProduct";
import { composeCacheObject } from "./composeCacheObject";
import { composeCartItem } from "./composeCartItem";

export async function revalidateCart(cart: TCartItem[], cache: TCache) {
  // 1. Determine stale products
  const now = new Date().getTime();
  const staleProductIds = cart
    .filter(({ pid }) => {
      let product = cache[pid];

      if (!product) return true;
      if (product.staleTime - now <= 0) return true;
      return false;
    })
    .map(({ pid }) => pid);

  if (staleProductIds.length === 0) return;

  // 2. Get fresh products
  const products = await actionGetProducts(staleProductIds);

  // 3. Update cache
  products.forEach(
    (p) => (cache = { ...cache, ...composeCacheObject(p.id, p) })
  );

  // 4. Update cart
  const newCart = cart
    .map(({ pid, qty, fid }) => {
      const product = cache[pid].value;
      return product && composeCartItem(product, qty, fid);
    })
    .filter((item) => item) as TCartItem[];

  // 5. Update store
  return { cart: newCart, _cache: cache };
}
