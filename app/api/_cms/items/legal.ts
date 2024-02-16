import { draftMode } from "next/headers";
import cmsAPI from "../cmsAPI";
import { TSEO } from "./seo";

const base = "/items/legal";

export type TLegal = {
  id: number;
  seo: TSEO;
  status: string;
  title: string;
  slug: string;
  content: string;
};

type TLegalList = Omit<TLegal, "content">;

async function readSlug(slug: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}?filter[slug]=${slug}&fields[]=*,seo.*`,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["legal"],
      },
    },
    isDraft
  ).then((res) => res.data[0] as TLegal);
}

async function readItems() {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI(
    `${base}?fields[]=title,slug`,
    {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["legal"],
      },
    },
    isDraft
  ).then((res) => res.data as TLegal[]);
}

export const CMS_Legal = {
  readSlug,
  readItems,
};
