import revolutAPI from "./revolutAPI";

const PATH = "/api/orders";

async function createItem(data: any) {
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
