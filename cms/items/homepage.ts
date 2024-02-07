import cmsAPI from "../cmsAPI";

const base = "/items/homepage";

export type THomepage = {
  id: number;
  web_title: string;
  web_description: string;
  hero_image: string;
  gallery_description: string;
  pricing_description: string;
  contact_description: string;
};

async function readSingleton() {
  return await cmsAPI(base, {
    method: "GET",
    next: {
      tags: ["homepage"],
    },
  }).then((res) => res.data as THomepage);
}

export const CMS_Homepage = {
  readSingleton,
};
