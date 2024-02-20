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
  product_ref: {
    asset: {
      id: string;
      filename_download: string;
    };
  };
  payment_state: number;
};

async function readDownloadable(id: string) {
  return await cmsAPI(
    `${base}/${id}?fields[]=payment_state,product_ref.asset.id,product_ref.asset.filename_download`,
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
