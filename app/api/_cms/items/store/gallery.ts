import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TGallery } from "../../types/gallery";

const base = "/items/gallery";

async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=*.*",
      "fields[]=media.asset.*",
      "fields[]=buying_options.*",
      "fields[]=buying_options.gallery_rel.title",
      "fields[]=buying_options.gallery_rel.cover_image",
      "fields[]=buying_options.filament_rels.filament_rel.*",
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

async function readItems() {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: ["fields[]=*.*", "fields[]=media.asset.*"],
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["gallery"],
      },
    },
    draftMode: isDraft,
  }).then((res) => res.data as TGallery[]);
}

export const CMS_Gallery = {
  readItem,
  readItems,
};
