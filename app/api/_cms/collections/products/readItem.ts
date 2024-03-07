import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TProduct } from ".";

export default async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: "/items/products",
    id,
    params: [
      "fields[]=*",
      "fields[]=gallery_rel.title",
      "fields[]=gallery_rel.cover_image",
      "fields[]=filament_rels.filament_rel.*",
    ],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : [id],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TProduct);
}
