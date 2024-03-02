import cmsAPI from "../../cmsAPI";

const base = "/items/shipping";

export type TShipping = {
  id: number;
  title: string;
  description: string;
  price: number;
};

async function readItem(id: number) {
  return await cmsAPI(base + "/" + id, {
    method: "GET",
    next: {
      tags: ["shipping"],
    },
  }).then((res) => res.data as TShipping);
}

async function readItems() {
  return await cmsAPI(base, {
    method: "GET",
    next: {
      tags: ["shipping"],
    },
  }).then((res) => res.data as TShipping[]);
}

export const CMS_Shipping = {
  readItem,
  readItems,
};