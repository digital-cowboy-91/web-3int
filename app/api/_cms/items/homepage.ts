import cmsAPI from "../cmsAPI";
import { TAsset } from "./files";
import { TSEO } from "./seo";

const base = "/items/homepage?fields[]=*,hero_image.*,seo.*";

export type THomepage = {
  id: number;
  seo: TSEO;
  hero_image: TAsset;
  motto: string;
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
