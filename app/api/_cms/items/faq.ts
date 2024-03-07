import cmsAPI from "../cmsAPI";
import { TFAQ } from "../types/faq";

const base = "/items/faq";

async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["faq"],
      },
    },
  }).then((res) => res.data as TFAQ[]);
}

export const CMS_FAQ = {
  readItems,
};
