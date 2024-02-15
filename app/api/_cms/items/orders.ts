import cmsAPI from "../cmsAPI";

const base = "/items/orders";

type TOrder = {
  id: string;
  product: string;
  amount: number;
  state: string;
};

async function createItem(data: TOrder) {
  return await cmsAPI(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// async function readItem(id: string) {
//   return await cmsAPI(
//     `${base}/${id}`,
//     {
//       method: "GET",
//       cache: "no-store",
//     },
//     false,
//     true
//   ).then((res) => res.data as TOrder);
// }

type TDownloadable = {
  product: {
    asset: {
      id: string;
      filename_download: string;
    };
  };
  state: string;
};

async function readDownloadable(id: string) {
  return await cmsAPI(
    `${base}/${id}?fields[]=state,product.asset.id,product.asset.filename_download`,
    {
      method: "GET",
      cache: "no-store",
    },
    false,
    true
  ).then((res) => res.data as TDownloadable);
}

export const CMS_Orders = {
  createItem,
  readDownloadable,
};
