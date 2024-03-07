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

  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=*",
      "fields[]=gallery_rel.title",
      "fields[]=gallery_rel.cover_image",
      "fields[]=filament_rels.filament_rel.*",
    ],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : [id],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TProduct);
}

async function readItems(ids?: string[]) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: [
      "fields[]=*",
      "fields[]=gallery_rel.title",
      "fields[]=gallery_rel.cover_image",
      "fields[]=filament_rels.filament_rel.*",
      ids ? `filter[id][_in]=${ids.join(",")}` : "",
    ],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["products"],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TProduct[]);
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
  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=id,price",
      "fields[]=asset.id",
      "fields[]=asset.filename_download",
    ],
    fetchInit: {
      method: "GET",
      cache: "no-store",
    },
    addSecret: true,
  }).then((res) => res.data as TDownloadable);
}

export const CMS_Products = {
  readItem,
  readItems,
  readDownloadable,
};
