import { TProduct } from "@/app/api/_cms/collections/products";
import {
  ArrowDownTrayIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import QuantitySelector from "../../cart/components/QuantitySelector";
import { calculateItemPrice } from "../../cart/lib/calculateItemPrice";
import { composeFilamentTitle } from "../../cart/lib/composeFilamentTitle";
import { ButtonDropdown_v2 } from "../../components/ButtonDropdown";
import asCurrency from "../../lib/asCurrency";
import ButtonAddToCart from "./ButtonAddToCart";

export default function BuyingOptions({ products }: { products: TProduct[] }) {
  const [pid, setPid] = useState<string>(products[0].id);
  const [fid, setFid] = useState<string | undefined>(undefined);

  const [quantity, setQuantity] = useState(1);

  let selectedProduct = products.find((p) => p.id === pid)!;
  let { id, price, is_digital, filament_refs, discounts } = selectedProduct;

  let amount = price,
    discount = 0;

  if (filament_refs.length && !fid) {
    setFid(filament_refs[0].filament_ref.id);
  }

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
          defaultSelected={fid}
          options={filament_refs.map(({ filament_ref }) => ({
            option: composeFilamentTitle(filament_ref),
            value: filament_ref.id,
          }))}
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
            filamentId={fid}
            className={is_digital ? "ms-auto" : ""}
          >
            <span>{asCurrency(amount)}</span>
            <ShoppingCartIcon className="size-4" />
          </ButtonAddToCart>
        ) : (
          <a
            className={`link-outline-success ${is_digital ? "ms-auto" : ""}`}
            href={"/d/" + id}
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
