import { draftMode } from "next/headers";
import cmsAPI from "../cmsAPI";
import { TProduct } from "./products";
import { TSEO } from "./seo";
import { TLicense } from "./licenses";
import { TAsset } from "./files";

const base = "/items/gallery";

type TAttribute = {
  name: string;
  value: string;
};

export type TGallery = {
  id: string;
  seo: TSEO;
  license: TLicense;
  title: string;
  cover_image: TAsset;
  attributes: TAttribute[];
  media: {
    asset: TAsset;
  }[];
  buying_options: TProduct[];
};

async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}/${id}?fields[]=*,cover_image.*,media.asset.*,buying_options.*,seo.*,license.*,attributes.*`,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["products", id],
      },
    },
    isDraft
  ).then((res) => res.data as TGallery);
}

async function readItems() {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}?fields[]=id,title,cover_image.*,attributes,media.asset.*`,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["gallery"],
      },
    },
    isDraft
  ).then((res) => res.data as TGallery[]);
}

export const CMS_Gallery = {
  readItem,
  readItems,
};
