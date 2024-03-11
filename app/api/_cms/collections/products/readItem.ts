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
      "fields[]=gallery_ref.title",
      "fields[]=gallery_ref.cover_image",
      "fields[]=filament_refs.filament_ref.*",
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
