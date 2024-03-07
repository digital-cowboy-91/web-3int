import cmsAPI from "../../cmsAPI";
import { TShipping } from ".";

const base = "/items/shipping";

export default async function readItem(id: number) {
  return await cmsAPI({
    path: base,
    id,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["shipping"],
      },
    },
  }).then((res) => res.data as TShipping);
}
