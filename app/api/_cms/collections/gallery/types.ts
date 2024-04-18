import { TAsset } from "../files";
import { TLicense } from "../licenses/types";
import { TProduct } from "../products";
import { TSEO } from "../seo";

export type TAttribute = {
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
  article: string;
  media: {
    asset: TAsset;
  }[];
  buying_options: TProduct[];
};
