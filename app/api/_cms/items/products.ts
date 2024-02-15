import cmsAPI from "../cmsAPI";

const base = "/items/products";

export type TProduct = {
  id: string;
  title: string;
  price: number;
  downloadable: boolean;
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

type TDownloadable = {
  id: string;
  price: number;
  asset: {
    id: string;
    filename_download: string;
  };
};

async function readDownloadable(id: string) {
  return await cmsAPI(
    `${base}/${id}?fields[]=id,price,asset.id,asset.filename_download`,
    {
      method: "GET",
      cache: "no-store",
    },
    false,
    true
  ).then((res) => res.data as TDownloadable);
}

export const CMS_Products = {
  readItem,
  readDownloadable,
};