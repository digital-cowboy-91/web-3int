import cmsAPI from "../../cmsAPI";
import { TOrder } from ".";

const base = "/items/orders";

export default async function createItem(data: TOrder) {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    addSecret: true,
  });
}
