import cmsAPI from "../cmsAPI";

export async function getPricing() {
  return await cmsAPI("/items/pricing", {
    method: "GET",
    next: {
      tags: ["pricing"],
    },
  }).then((res) => res.data);
}
