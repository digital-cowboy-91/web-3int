import { TProduct } from "@/app/api/_cms/types/products";

export function composeProductCache(product: TProduct, ttl: number = 3600000) {
  return {
    id: product.id,
    data: product,
    staleTime: Date.now() + ttl,
  };
}
