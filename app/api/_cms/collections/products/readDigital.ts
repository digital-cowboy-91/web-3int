import { TDigital } from ".";
import cmsAPI from "../../cmsAPI";

export default async function readDigital(id: string) {
  return await cmsAPI({
    path: "/items/products",
    id,
    params: [
      "fields[]=id,price",
      "fields[]=asset.id",
      "fields[]=asset.filename_download",
    ],
    fetchInit: {
      method: "GET",
      cache: "no-store",
    },
    addSecret: true,
  }).then((res) => res.data as TDigital);
}
