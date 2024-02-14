import cmsAPI from "../cmsAPI";

const base = "/items/products";

export type TProduct = {
  id: string;
  title: string;
  price: number;
  gallery_rel: {
    id: string;
    title: string;
  };
};

async function readItem(id: string) {
  return await cmsAPI(`${base}/${id}?fields[]=*,gallery_rel.title`, {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.data as TProduct);
}

export const CMS_Products = {
  readItem,
};
