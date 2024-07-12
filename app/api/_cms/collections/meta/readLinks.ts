import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";
import { TLink } from "./types";

const base = "/items/pages_meta";
export default async function readLinks(group?: string) {
  const { isEnabled: isDraft } = draftMode();

  return await cmsAPI({
    path: base,
    params: [
      "fields[]=rel_item.title",
      "fields[]=slug",
      "fields[]=path",
      "fields[]=group",
      group ? `filter[group][_eq]=${group}` : "",
    ],
    fetchInit: {
      method: "GET",
      // cache: isDraft ? "no-store" : "default",
      // next: {
      //   tags: isDraft ? [] : ["pages_meta"],
      // },
    },
    draftMode: isDraft,
  }).then((res) => {
    console.log(res.data);
    return res.data as TLink[];
  });
}
