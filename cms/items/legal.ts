import cmsAPI from "../cmsAPI";

const base = "/items/legal";

export type TLegal = {
  id: number;
  title: string;
  slug: string;
  content: string;
};

type TLegalList = Omit<TLegal, "content">;

async function readBySlug(slug: string) {
  return await cmsAPI(`${base}?filter[slug]=${slug}`, {
    method: "GET",
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.data as TLegal[]);
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
  readBySlug,
  readItems,
};
