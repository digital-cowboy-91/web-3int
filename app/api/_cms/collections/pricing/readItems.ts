import { TPricing } from ".";
import cmsAPI from "../../cmsAPI";

const base = "/items/pricing";

export default async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["pricing"],
      },
    },
  }).then((res) => res.data as TPricing[]);
}
