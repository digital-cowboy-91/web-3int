import { z } from "zod";

const SCart = z.object({
  id: z.string().uuid(),
  quantity: z.number().min(1),
});

export type TCart = z.infer<typeof SCart>;

export function getCart(): TCart[] {
  try {
    let cart = localStorage.getItem("cart");

    if (!cart) return [];

    cart = JSON.parse(cart);

    return z.array(SCart).parse(cart);
  } catch (e) {
    return [];
  }
}

export function setCartItem(item: TCart) {
  let cart = getCart();

  if (cart.findIndex((i: any) => i.id === item.id) > -1) return;

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
}
