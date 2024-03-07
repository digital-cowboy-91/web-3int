import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TProduct } from "./products";
import { TSEO } from "../seo";
import { TLicense } from "../licenses";
import { TAsset } from "../files";

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

  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=*.*",
      "fields[]=media.asset.*",
      "fields[]=buying_options.*",
      "fields[]=buying_options.gallery_rel.title",
      "fields[]=buying_options.gallery_rel.cover_image",
      "fields[]=buying_options.filament_rels.filament_rel.*",
    ],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["products", id],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TGallery);
}

async function readItems() {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: ["fields[]=*.*", "fields[]=media.asset.*"],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["gallery"],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TGallery[]);
}

export const CMS_Gallery = {
  readItem,
  readItems,
};
