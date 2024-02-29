import { TDiscount } from "@/app/api/_cms/items/store/products";

export function calculateItemPrice(
  price: number,
  quantity: number,
  discounts: TDiscount[]
) {
  let discount_pct = 0;

  if (discounts && discounts.length > 0) {
    let sorted = discounts.sort(
      (first, last) => last.quantity - first.quantity
    );
    discount_pct = sorted.find((d) => quantity >= d.quantity)?.percentage || 0;
  }

  let amount = (price * quantity * (100 - discount_pct)) / 100;
  let discount_amount = price * quantity - amount;

  return { amount, discount_amount, discount_pct };
}
