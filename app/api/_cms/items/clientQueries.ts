import cmsAPI from "../cmsAPI";
import { TContactForm } from "../types/clientQueries";

const base = "/items/client_queries";

async function createItem(data: TContactForm) {
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

export const CMS_ClientQuery = {
  createItem,
};
