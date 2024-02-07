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
  id: number;
  title: string;
  cover_image: string;
  attributes: TAttribute[];
  media: {
    asset: TAsset;
  }[];
};

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
  readItems,
};
