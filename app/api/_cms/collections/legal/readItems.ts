import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TLegal } from ".";

const base = "/items/legal";

export default async function readItems() {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: ["fields[]=title,slug"],
    draftMode: isDraft,
    fetchInit: {
      method: "GET",
      cache: isDraft ? "no-store" : "default",
      next: {
        tags: isDraft ? [] : ["legal"],
      },
    },
  }).then((res) => res.data as TLegal[]);
}
