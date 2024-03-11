import { CMSOrders } from "@/app/api/_cms/collections/orders";
import { renderAsync } from "@react-email/render";
import OrderSummaryEmail from "../../components/summary.email";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const data = await CMSOrders.readItem(id);

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
