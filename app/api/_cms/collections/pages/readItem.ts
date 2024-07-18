import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TPage } from "./types";

const base = "/items/pages";
export default async function readLinks(path: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: [
      "fields[]=*",
      "fields[]=meta.*",
      "fields[]=components.collection",
      "fields[]=components.item.*",
      `filter[meta][path][_eq]=${path}`,
    ],
    fetchInit: {
      method: "GET",
      // cache: isDraft ? "no-store" : "default",
      // next: {
      //   tags: isDraft ? [] : [path],
      // },
    },
    draftMode: isDraft,
  }).then((res) => res.data[0] as TPage
  );
}
