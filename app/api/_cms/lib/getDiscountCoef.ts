import { TDiscount } from "../items/products";

export default function getDiscountCoef(
  discounts: TDiscount[],
  watchQuantity: number
) {
  let sorted = discounts.sort((first, last) => last.quantity - first.quantity);
  let match = sorted.find((d) => watchQuantity >= d.quantity)?.percentage || 0;

  return (100 - match) / 100;
}
