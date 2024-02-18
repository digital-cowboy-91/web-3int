import { REVOLUT_Orders } from "../../_revolut/order";

export async function POST(request: Request) {
  const data = await request.json();

  const res = await REVOLUT_Orders.createItem(data);

  return new Response(JSON.stringify(res.data), {
    status: res.status,
    statusText: res.statusText,
  });
}
