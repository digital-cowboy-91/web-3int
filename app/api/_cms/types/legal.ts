import { TSEO } from "./seo";

export type TLegal = {
  id: number;
  seo: TSEO;
  status: string;
  title: string;
  slug: string;
  content: string;
};

export type TLegalList = Omit<TLegal, "content">;
