import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";
import ShippingItems from "./ShippingItems";

export default async function ShippingBlock() {
  const methods = await CMS_Shipping.readItems();

  if (!methods.length) return null;

  return (
    <div>
      <h2>Shipping methods</h2>
      <div>
        Links to digital files will be delivered to email address provided at
        checkout
      </div>
      <div className="space-y-4">
        <ShippingItems methods={methods} />
      </div>
    </div>
  );
}
