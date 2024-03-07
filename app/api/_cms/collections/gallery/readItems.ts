import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TGallery } from ".";

const base = "/items/gallery";

export default async function readItems() {
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
