import { CMSOrders } from "@/app/api/_cms/collections/orders";
import { renderAsync } from "@react-email/render";
import OrderSummaryEmail from "./summary.email";

export async function GET(
  request: Request,
  context: {
    params: { id: string };
  }
) {
  const data = await CMSOrders.readItem(context.params.id);

  if (!data) {
    return new Response("Not found", {
      status: 404,
    });
  }

  const html = await renderAsync(
    OrderSummaryEmail({
      title: "Order confirmed",
      subtitle: "Below you will find the summary & download links",
      preview: "Preview",
      data,
    })
  );

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
    return new Response("Not found", {
      status: 404,
    });
  }

  console.log(data);

  const html = await renderAsync(
    OrderSummaryEmail({
      title: "Order confirmed",
      subtitle: "Below you will find the summary & download links",
      preview: "Preview",
      data,
    })
  );

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
