import cmsAPI from "../../cmsAPI";
import { THomepage } from ".";

const base = "/items/homepage";
export default async function readSingleton() {
  return await cmsAPI({
    path: base,
    params: ["fields[]=*.*"],
    fetchInit: {
      method: "GET",
      next: {
        tags: ["homepage"],
      },
    },
  }).then((res) => res.data as THomepage);
}
