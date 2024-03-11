import { UUID } from "crypto";
import cmsAPI from "../../cmsAPI";

export default async function downloadItem(id: UUID) {
  return await cmsAPI({
    path: "/assets",
    id,
    params: ["download"],
    fetchInit: {
      method: "GET",
      cache: "no-store",
    },
    addSecret: true,
    responseAsIs: true,
  }).then((res) => res.data);
}
