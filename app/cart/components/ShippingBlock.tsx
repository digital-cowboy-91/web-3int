import { CMSShipping } from "@/app/api/_cms/collections/shipping";
import ShippingItems from "./ShippingItems";

export default async function ShippingBlock() {
  const methods = await CMSShipping.readItems();

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
