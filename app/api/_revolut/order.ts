import revolutAPI from "./revolutAPI";

export type TOrderData = {
  description: string;
  amount: number;
  currency: "GBP";
  customer: {
    full_name: string;
    email: string;
  };
  metadata: {
    product_id: string;
    quantity: number;
    privacy: true;
    terms: true;
    marketing: boolean;
    note?: string | undefined;
    colour?: string | undefined;
    downloadable: boolean;
    forename: string;
    surname: string;
  };
  shipping_address?:
    | {
        street_line_1: string;
        street_line_2?: string | undefined;
        country_code: "GB";
        city: string;
        postcode: string;
      }
    | undefined;
};

const PATH = "/api/orders";

async function createItem(data: TOrderData) {
  return await revolutAPI(PATH, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function readItem(id: string) {
  return await revolutAPI(PATH + "/" + id, {
    method: "GET",
  });
}

export const REVOLUT_Orders = {
  createItem,
  readItem,
};
