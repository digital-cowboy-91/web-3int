import cmsAPI from "../cmsAPI";

export async function getFAQ() {
  return await cmsAPI("/items/faq", {
    method: "GET",
    next: {
      tags: ["faq"],
    },
  }).then((res) => res.data);
}
