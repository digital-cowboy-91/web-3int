import { z } from "zod";

export const SCart = z.object({
  pid: z.string().uuid(),
  quantity: z.number().min(1),
  filament: z.string().uuid().optional(),
});

export type TCart = z.infer<typeof SCart>;

export function getLocalCart(): TCart[] {
  try {
    let cart = localStorage.getItem("cart");

    if (!cart) return [];

    cart = JSON.parse(cart);

    console.log("getCart", cart);

    return z.array(SCart).parse(cart);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export function getCart(): TCart[] {
  try {
    let cart = localStorage.getItem("cart");

    if (!cart) return [];

    cart = JSON.parse(cart);

    console.log("getCart", cart);

    return z.array(SCart).parse(cart);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export function setCartItem(item: TCart) {
  let cart = getCart();

  if (cart.findIndex((i: any) => i.pid === item.pid) > -1) return;

  cart.push(item);

  console.log("setCartItem", cart);

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function fetchCartProducts() {
  try {
    let cart = getCart();

    if (!cart.length) return [];

    return cart;
  } catch (e) {
    console.log(e);
  }
}
