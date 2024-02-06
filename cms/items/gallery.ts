import cmsAPI from "../cmsAPI";

export async function getGalleryItems() {
  return await cmsAPI(
    "/items/gallery?fields[]=id,title,cover_image,attributes,media.asset.*",
    {
      method: "GET",
      next: {
        tags: ["gallery"],
      },
    }
  ).then((res) => res.data);
}
