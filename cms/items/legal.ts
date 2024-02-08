import cmsAPI from "../cmsAPI";

const base = "/items/legal";
const draftToken = process.env.CMS_DRAFT_TOKEN;

export type TLegal = {
  id: number;
  status: string;
  title: string;
  slug: string;
  content: string;
};

type TLegalList = Omit<TLegal, "content">;

async function previewSlug(slug: string) {
  return await cmsAPI(
    `${base}?filter[slug]=${slug}&access_token=${draftToken}`,
    {
      method: "GET",
      cache: "no-store",
    }
  ).then((res) => res.data[0] as TLegal);
}

async function readSlug(slug: string) {
  return await cmsAPI(`${base}?filter[slug]=${slug}`, {
    method: "GET",
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.data[0] as TLegal);
}

async function readItems() {
  return await cmsAPI(`${base}?fields[]=title,slug`, {
    method: "GET",
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.data as TLegalList[]);
}

export const CMS_Legal = {
  previewSlug,
  readSlug,
  readItems,
};
