import { TAsset } from "../files";
import { TSEO } from "../seo";

export type THomepage = {
  id: number;
  seo: TSEO;
  hero_image: TAsset;
  motto: string;
  gallery_description: string;
  pricing_description: string;
  contact_description: string;
};
