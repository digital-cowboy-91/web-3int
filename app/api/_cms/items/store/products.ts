import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TFilament } from "./filaments";

const base = "/items/products";

export type TDiscount = {
  quantity: number;
  percentage: number;
};

export type TProduct = {
  id: string;
  title: string;
  price: number;
  downloadable: boolean;
  gallery_rel: {
    id: string;
    title: string;
    cover_image: string;
  };
  filament_rels: {
    filament_rel: TFilament;
  }[];
  colours: string[];
  discounts: TDiscount[] | [];
};

async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}/${id}?fields[]=*,gallery_rel.title,gallery_rel.cover_image,filament_rels.filament_rel.*`,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : [id],
      },
    },
    isDraft
  ).then((res) => res.data as TProduct);
}

async function readItems(ids?: string[]) {
  const { isEnabled: isDraft } = draftMode();

  const filter = ids ? `&filter[id][_in]=${ids.join(",")}` : "";
  const fields =
    "fields[]=*,gallery_rel.title,gallery_rel.cover_image,filament_rels.filament_rel.*";

  return await cmsAPI(
    base + "?" + fields + filter,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["products"],
      },
    },
    isDraft
  ).then((res) => res.data as TProduct[]);
}

export type TDownloadable = {
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
  readItems,
  readDownloadable,
};
