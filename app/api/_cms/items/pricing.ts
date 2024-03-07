import cmsAPI from "../cmsAPI";
import { TPricing } from "../types/pricing";

const base = "/items/pricing";

async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["pricing"],
      },
    },
  }).then((res) => res.data as TPricing[]);
}

export const CMS_Pricing = {
  readItems,
};
