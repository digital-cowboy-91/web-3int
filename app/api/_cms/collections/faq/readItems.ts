import cmsAPI from "../../cmsAPI";
import { TFAQ } from ".";

const base = "/items/faq_data";

export default async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["faq"],
      },
    },
  }).then((res) => res.data as TFAQ[]);
}
