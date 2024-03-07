import cmsAPI from "../../cmsAPI";

const base = "/items/orders";

async function createItem(data: TOrder) {
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
async function readDownloadable(id: string) {
  return await cmsAPI({
    path: base,
    params: [
      "fields[]=payment_state",
      "fields[]=product_ref.asset.id",
      "fields[]=product_ref.asset.filename_download",
    ],
    fetchInit: {
      method: "GET",
      cache: "no-store",
    },
    addSecret: true,
  }).then((res) => res.data as TDownloadable);
}

export const CMS_Orders = {
  createItem,
  readDownloadable,
};
