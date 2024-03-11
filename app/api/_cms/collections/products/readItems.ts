import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TProduct } from ".";

export default async function readItems(ids?: string[]) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: "/items/products",
    params: [
      "fields[]=*",
      "fields[]=gallery_ref.title",
      "fields[]=gallery_ref.cover_image",
      "fields[]=filament_refs.filament_ref.*",
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
