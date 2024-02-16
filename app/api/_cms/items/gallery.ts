import { draftMode } from "next/headers";
import cmsAPI from "../cmsAPI";
import { TProduct } from "./products";
import { TSEO } from "./seo";

const base = "/items/gallery";

type TAttribute = {
  name: string;
  value: string;
};

export type TAsset = {
  id: string;
  title: string;
  filename_download: string;
  type: string;
  tags: string[] | null;
};

export type TGallery = {
  id: string;
  seo: TSEO;
  title: string;
  cover_image: TAsset;
  attributes: TAttribute[];
  work_name: string | null;
  work_url: string | null;
  author_name: string | null;
  author_url: string | null;
  license_name: string | null;
  license_url: string | null;
  claim_ownership: boolean;
  media: {
    asset: TAsset;
  }[];
  buying_options: TProduct[];
};

async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}/${id}?fields[]=*,cover_image.*,media.asset.*, buying_options.*, seo.*`,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : [id],
      },
    },
    isDraft
  ).then((res) => res.data as TGallery);
}

async function readItems() {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}?fields[]=id,title,cover_image.*,attributes,media.asset.*,seo.*`,
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
