import cmsAPI from "../cmsAPI";

const base = "/items/gallery";
const draftToken = process.env.CMS_DRAFT_TOKEN;

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

async function previewItem(id: string) {
  return await cmsAPI(
    `${base}/${id}?fields[]=*,media.asset.*&access_token=${draftToken}`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.data as TGallery);
}

async function readItem(id: string) {
  return await cmsAPI(`${base}/${id}?fields[]=*,media.asset.*`, {
    method: "GET",
    next: {
      tags: [id],
    },
  }).then((res) => res.data as TGallery);
}

async function previewItems() {
  return await cmsAPI(
    `${base}?fields[]=id,title,cover_image,attributes,media.asset.*&access_token=${draftToken}`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.data as TGallery[]);
}

async function readItems() {
  return await cmsAPI(
    `${base}?fields[]=id,title,cover_image,attributes,media.asset.*`,
    {
      method: "GET",
      next: {
        tags: ["gallery"],
      },
    }
  ).then((res) => res.data as TGallery[]);
}

export const CMS_Gallery = {
  previewItem,
  readItem,
  previewItems,
  readItems,
};
