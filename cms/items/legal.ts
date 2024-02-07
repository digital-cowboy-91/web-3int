import cmsAPI from "../cmsAPI";

const base = "/items/legal";

export async function getLegalBySlug(slug: string) {
  return await cmsAPI(`${base}?filter[slug]=${slug}`, {
    method: "GET",
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.data);
}

export async function getLegalItems() {
  return await cmsAPI(`${base}?fields[]=title,slug`, {
    method: "GET",
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.data);
}
