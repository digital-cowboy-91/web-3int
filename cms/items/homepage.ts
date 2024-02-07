import cmsAPI from "../cmsAPI";

export async function getHomepage() {
  return await cmsAPI("/items/homepage", {
    method: "GET",
    next: {
      tags: ["homepage"],
    },
  }).then((res) => res.data);
}
