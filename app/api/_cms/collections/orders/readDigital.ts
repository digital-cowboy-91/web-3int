import cmsAPI from "../../cmsAPI";
import { TDigital } from ".";

const base = "/items/orders";

export default async function readDownloadable(id: string) {
  return await cmsAPI({
    path: base,
    params: [
      "fields[]=payment_state",
      "fields[]=product_ref.asset.id",
      "fields[]=product_ref.asset.filename_download",
    ],
    fetchInit: {
      method: "GET",
      cache: "no-store",
    },
    addSecret: true,
  }).then((res) => res.data as TDigital);
}
