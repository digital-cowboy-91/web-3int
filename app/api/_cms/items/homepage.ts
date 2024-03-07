import cmsAPI from "../cmsAPI";
import { THomepage } from "../types/homepage";

const base = "/items/homepage";
async function readSingleton() {
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

export const CMS_Homepage = {
  readSingleton,
};
