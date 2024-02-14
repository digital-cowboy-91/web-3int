import ButtonDropdown from "@/app/components/ButtonDropdown";
import { CSSButtonOutline } from "@/app/styles";
import { useState } from "react";
import RevolutCheckout from "@revolut/checkout";
import { TProduct } from "@/app/api/_cms/items/products";
import actionBuy from "./actionBuy";
import actionProcess from "./actionProcess";

export default function BuyingOptions({ products }: { products: TProduct[] }) {
  const [index, setIndex] = useState(0);

  let { id, price } = products[index];

  async function submitBuy() {
    const { oid, token } = JSON.parse((await actionBuy(id)) as string);

    if (!token) {
      console.log("ERR: No token returned");
      return;
    }

    const RC = await RevolutCheckout(token, "sandbox");

    RC.payWithPopup({
      onSuccess: async () => {
        console.log(oid);
        const res = await actionProcess(oid);
        console.log("RES", res);
      },
    });
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-inline items-center gap-2">
        Get{" "}
        <ButtonDropdown
          options={products.map(({ title }) => title)}
          activeIndex={index}
          setActiveIndex={(i) => setIndex(i)}
        />{" "}
        for <strong>{price > 0 ? "£" + price : "FREE"}</strong>
      </div>
      <button
        className={`${CSSButtonOutline} bg-action text-dark`}
        onClick={() => {
          if (price > 0) {
            return submitBuy();
          }
        }}
      >
        {price > 0 ? "Buy now" : "Download"}
      </button>
    </div>
  );
}
