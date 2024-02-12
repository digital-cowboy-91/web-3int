import { draftMode } from "next/headers";
import cmsAPI from "../cmsAPI";

const base = "/items/gallery";

type TAttribute = {
  name: string;
  value: string;
};

export type TAsset = {
  id: string;
  title: string;
  type: string;
  tags: string[] | null;
};

export type TGallery = {
  id: string;
  title: string;
  cover_image: string;
  attributes: TAttribute[];
  media: {
    asset: TAsset;
  }[];
};

async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}/${id}?fields[]=*,media.asset.*`,
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
    `${base}?fields[]=id,title,cover_image,attributes,media.asset.*`,
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
