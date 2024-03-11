import { TContactForm } from ".";
import cmsAPI from "../../cmsAPI";

const base = "/items/client_queries";

export default async function createItem(data: TContactForm) {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  });
}
