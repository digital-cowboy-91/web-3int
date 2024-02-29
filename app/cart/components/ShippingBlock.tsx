import { CMS_Shipping } from "@/app/api/_cms/items/store/shipping";
import ShippingItems from "./ShippingItems";

export default async function ShippingBlock({
  className,
}: {
  className?: string;
}) {
  const methods = await CMS_Shipping.readItems();

  if (!methods.length) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <ShippingItems methods={methods} />
    </div>
  );
}
