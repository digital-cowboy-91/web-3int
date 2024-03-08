import QuantitySelector from "@/app/cart/components/QuantitySelector";
import { calculateItemPrice } from "@/app/cart/lib/calculateItemPrice";
import { ButtonDropdown_v2 } from "@/app/components/ButtonDropdown";
import {
  ArrowDownTrayIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ButtonAddToCart from "./ButtonAddToCart";
import { TProduct } from "@/app/api/_cms/collections/products";
import asCurrency from "@/app/lib/asCurrency";

export default function BuyingOptions({ products }: { products: TProduct[] }) {
  const [pid, setPid] = useState<string>(products[0].id);
  const [fid, setFid] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);

  let selectedProduct = products.find((p) => p.id === pid)!;
  let { id, price, is_digital, filament_rels, discounts } = selectedProduct;

  let amount = price,
    discount = 0;

  if (quantity > 1) {
    let calc = calculateItemPrice(price, quantity, discounts);
    amount = calc.amount;
    discount = calc.discount_pct;
  }

  return (
    <div className="w-full grid gap-4">
      <ButtonDropdown_v2
        id="products"
        defaultSelected={pid}
        options={products.map(({ id, title }) => ({
          option: title,
          value: id,
        }))}
        onSelect={(value) => setPid(value)}
        className="w-full "
        label="Delivery format"
      />

      {!is_digital && (
        <ButtonDropdown_v2
          id="filament"
          defaultSelected={fid || filament_rels[0].filament_rel.id.toString()}
          options={filament_rels.map(
            ({ filament_rel: { id, material, colour, cosmetic } }) => ({
              option: material + ", " + colour + " " + cosmetic,
              value: id.toString(),
            })
          )}
          onSelect={(value) => setFid(value)}
          className="w-full"
          label="Filament"
        />
      )}
      <div className="flex justify-between">
        <QuantitySelector
          value={quantity}
          disableDecrease={quantity === 1}
          handleChange={(q) => setQuantity(q)}
          className={is_digital ? "hidden" : ""}
        />
        {price > 0 ? (
          <ButtonAddToCart
            product={selectedProduct}
            quantity={quantity}
            filamentId={fid ? parseInt(fid) : undefined}
            className={is_digital ? "ms-auto" : ""}
          >
            <span>{asCurrency(amount)}</span>
            <ShoppingCartIcon className="size-4" />
          </ButtonAddToCart>
        ) : (
          <a
            className={`link-outline-success ${is_digital ? "ms-auto" : ""}`}
            href={"/api/download?pid=" + id}
            download
          >
            <span>Free</span>
            <ArrowDownTrayIcon className="size-4" />
          </a>
        )}
      </div>
    </div>
  );
}
