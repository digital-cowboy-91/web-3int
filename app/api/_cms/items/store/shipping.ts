import cmsAPI from "../../cmsAPI";
import { TShipping } from "../../types/shipping";

const base = "/items/shipping";

async function readItem(id: number) {
  return await cmsAPI({
    path: base,
    id,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["shipping"],
      },
    },
  }).then((res) => res.data as TShipping);
}

async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["shipping"],
      },
    },
  }).then((res) => res.data as TShipping[]);
}

export const CMS_Shipping = {
  readItem,
  readItems,
};
