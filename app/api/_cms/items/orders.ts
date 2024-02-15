import cmsAPI from "../cmsAPI";

const base = "/items/orders";

type TOrder = {
  r_id: string;
  r_token: string;
  product: string;
  amount: number;
  status: string;
  customer_email: string;
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

export const CMS_Orders = {
  createItem,
};
