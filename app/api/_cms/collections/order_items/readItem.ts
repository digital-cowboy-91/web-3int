import { TOrderItemDownload } from ".";
import cmsAPI from "../../cmsAPI";

const base = "/items/order_items";

export default async function readItem(id: string) {
  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=order_ref.id",
      "fields[]=order_ref.payment_status",
      "fields[]=product_ref.asset.id",
      "fields[]=product_ref.asset.filename_download",
    ],
    fetchInit: {
      method: "GET",
      cache: "no-store",
      // next: {
      //   revalidate: isDraft ? 0 : 60 * 60 * 24,
      // },
    },
    addSecret: true,
  }).then((res) => {
    return res.data as TOrderItemDownload;
  });
}
