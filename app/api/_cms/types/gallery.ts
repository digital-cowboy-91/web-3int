import { TAsset } from "./files";
import { TLicense } from "./licenses";
import { TProduct } from "./products";
import { TSEO } from "./seo";

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
