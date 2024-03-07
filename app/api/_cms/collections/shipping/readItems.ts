import cmsAPI from "../../cmsAPI";
import { TShipping } from ".";

const base = "/items/shipping";

export default async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["shipping"],
      },
    },
  }).then((res) => res.data as TShipping[]);
}
