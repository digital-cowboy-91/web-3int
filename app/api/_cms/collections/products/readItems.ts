import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TProduct } from ".";

export default async function readItems(ids?: string[]) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: "/items/products",
    params: [
      "fields[]=*",
      "fields[]=gallery_rel.title",
      "fields[]=gallery_rel.cover_image",
      "fields[]=filament_rels.filament_rel.*",
      ids ? `filter[id][_in]=${ids.join(",")}` : "",
    ],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["products"],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TProduct[]);
}
