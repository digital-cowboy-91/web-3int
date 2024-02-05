import cmsAPI from "../cmsAPI";

export async function getLegalBySlug(slug: string) {
  return await cmsAPI(`/items/legal?filter[slug]=${slug}`, {
    method: "GET",
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.data);
}
