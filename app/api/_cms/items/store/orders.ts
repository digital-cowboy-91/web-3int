import cmsAPI from "../../cmsAPI";

const base = "/items/orders";

type TOrderItems = {
  product_ref: string;
  filament_ref: number | undefined;
  description: string;
  quantity: number;
  discount: number;
  discount_pct: number;
  price_at_sale: number;
  amount: number;
};
type TOrder = {
  stripe_id: string;
  items_ref: TOrderItems[];
  shipping_ref?: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

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
