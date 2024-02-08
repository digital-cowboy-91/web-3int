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

async function readBySlug(slug: string, isDraft: boolean = false) {
  const [_slug, status, version] = slug.split("%3A");
  const filters = [`filter[slug]=${_slug}`];

  if (isDraft) {
    if (status) filters.push(`filter[status]=${status}`);
    if (version) filters.push(`filter[version]=${version}`);
  }

  console.log(filters.join("&"));

  return await cmsAPI(`${base}?${filters.join("&")}`, {
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
