import { TFilament } from "./filaments";

export type TDiscount = {
  quantity: number;
  percentage: number;
};

export type TProduct = {
  id: string;
  title: string;
  price: number;
  downloadable: boolean;
  gallery_rel: {
    id: string;
    title: string;
    cover_image: string;
  };
  filament_rels: {
    filament_rel: TFilament;
  }[];
  colours: string[];
  discounts: TDiscount[] | [];
};

export type TDownloadable = {
  id: string;
  price: number;
  asset: {
    id: string;
    filename_download: string;
  };
};
