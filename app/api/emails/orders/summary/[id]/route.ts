import { CMSOrders } from "@/app/api/_cms/collections/orders";
import { renderAsync } from "@react-email/render";
import OrderSummaryEmail from "./summary.email";

export async function GET(
  request: Request,
  context: {
    params: { id: string };
  }
) {
  const id = context.params.id;

  console.log(`[ORDER SUMMARY] GET request for order ${id}`);

  const data = await CMSOrders.readItem(id);
  console.log("[ORDER SUMMARY] Order data", data);

  if (!data) {
    console.log(`[ORDER SUMMARY] Order ${id} not found`);
    return new Response("Not found", {
      status: 404,
    });
  }

  console.log(`[ORDER SUMMARY] Order ${id} found, rendering template`);

  const html = await renderAsync(
    OrderSummaryEmail({
      title: "Order confirmed",
      subtitle: "Below you will find the summary & download links",
      preview: "Preview",
      data,
    })
  );

  console.log(`[ORDER SUMMARY] Order ${id} template rendered`);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data) {
    console.log("[ORDER SUMMARY] Order not found");
    return new Response("Not found", {
      status: 404,
    });
  }

  console.log(`[ORDER SUMMARY] Order received`, data);

  const html = await renderAsync(
    OrderSummaryEmail({
      title: "Order confirmed",
      subtitle: "Below you will find the summary & download links",
      preview: "Preview",
      data,
    })
  );

  console.log(`[ORDER SUMMARY] Order template rendered`);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
