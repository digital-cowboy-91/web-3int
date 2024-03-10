import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TGallery } from ".";

const base = "/items/gallery";

export default async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=*.*",
      "fields[]=media.asset.*",
      "fields[]=buying_options.*",
      "fields[]=buying_options.gallery_ref.title",
      "fields[]=buying_options.gallery_ref.cover_image",
      "fields[]=buying_options.filament_refs.filament_ref.*",
    ],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["products", id],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TGallery);
}
