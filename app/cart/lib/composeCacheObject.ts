import { TCache } from "../components/Cart.store";

export function composeCacheObject(
  key: string,
  value: any,
  ttl: number = 3600000
): TCache {
  return {
    [key]: {
      value,
      staleTime: new Date().getTime() + ttl,
    },
  };
}
