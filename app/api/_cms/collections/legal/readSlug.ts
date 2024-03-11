import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TLegal } from ".";

const base = "/items/legal";

export default async function readSlug(slug: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: [`filter[slug]=${slug}`, "fields[]=*,seo.*"],
    draftMode: isDraft,
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["legal"],
      },
    },
  }).then((res) => res.data[0] as TLegal);
}
