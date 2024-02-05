import cmsAPI from "../cmsAPI";

export async function createClientQuery(data: any) {
  return await cmsAPI("/items/client_queries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
