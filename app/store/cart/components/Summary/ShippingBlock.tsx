import { CMSShipping } from "@/app/api/_cms/collections/shipping";
import ShippingItems from "./ShippingItems";

export default async function ShippingBlock() {
  const methods = await CMSShipping.readItems();

  if (!methods.length) return null;

  return (
    <div className="content-wrapper__l2">
      <h2>Shipping methods</h2>
      <p>
        Links to digital files will be delivered to email address provided at
        checkout
      </p>
      <ShippingItems methods={methods} />
    </div>
  );
}
