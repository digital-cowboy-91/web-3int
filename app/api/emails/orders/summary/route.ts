import { renderAsync } from "@react-email/render";
import OrderSummaryEmail from "../components/summary.email";
import zeptoApi from "../../zeptoAPI";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data) {
    return new Response("Not found", {
      status: 404,
    });
  }

  const htmlBody = await renderAsync(
    OrderSummaryEmail({
      title: "Order confirmed",
      subtitle: "Below you will find the summary & download links",
      preview: "Preview",
      data,
    })
  );

  const textBody = await renderAsync(
    OrderSummaryEmail({
      title: "Order confirmed",
      subtitle: "Below you will find the summary & download links",
      preview: "Preview",
      data,
    }),
    {
      plainText: true,
    }
  );

  if (!htmlBody || !textBody) {
    return new Response("Not found", {
      status: 404,
    });
  }

  const res = await zeptoApi({
    from: {
      name: "3INT UK",
      address: "noreply@notification.3int.uk",
    },
    to: [
      {
        email_address: {
          name: data.customer_ref?.name,
          address: data.customer_ref.email,
        },
      },
    ],
    subject: "Order confirmation",
    textBody,
    htmlBody,
  });

  if (!res) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return new Response(res);
}
