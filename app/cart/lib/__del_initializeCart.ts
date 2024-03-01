import { CMS_Products } from "@/app/api/_cms/items/store/products";
import { TCartItem, TCartLocalItem } from "../components/Cart.store";
import { composeCartItem } from "./composeCartItem";

export async function initializeCart(localCart: TCartLocalItem[]) {
  let ids = localCart.map((i) => i.pid);
  let products = await CMS_Products.readItems(ids);

  let cart = [];

  for (let i of localCart) {
    let product = products.find((p) => p.id === i.pid);

    if (!product) continue;

    let item = composeCartItem(product, i.qty, i.fid);

    cart.push(item);
  }

  return cart as TCartItem[];
}
