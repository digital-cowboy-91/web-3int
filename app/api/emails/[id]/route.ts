import { renderAsync } from "@react-email/render";
import { UUID } from "crypto";
import { CMSEmailsSent } from "../../_cms/collections/emails_sent";
import { CMSOrders } from "../../_cms/collections/orders";
import OrderSummaryEmail from "../components/summary.email";
import zeptoApi from "../zeptoAPI";

async function orderBranch({
  emailId,
  orderId,
  type,
  includePlainText = false,
}: {
  emailId: UUID;
  orderId: UUID;
  type: string;
  includePlainText?: boolean;
}) {
  const data = await CMSOrders.readItem(orderId);

  if (!data) {
    throw new Error("Invalid order number");
  }

  if (type === "summary") {
    return {
      subject: "Order confirmation",
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
      html: await renderAsync(
        OrderSummaryEmail({
          emailId,
          title: "Order confirmed",
          subtitle: "Below you will find the summary & download links",
          preview: "Preview",
          data,
        })
      ),
      text:
        includePlainText &&
        (await renderAsync(
          OrderSummaryEmail({
            emailId,
            title: "Order confirmed",
            subtitle: "Below you will find the summary & download links",
            preview: "Preview",
            data,
          }),
          {
            plainText: true,
          }
        )),
    };
  }

  throw new Error("Invalid template");
}

export async function GET(request: Request, context: { params: { id: UUID } }) {
  try {
    // TODO [MEDIUM]: Auth
    const id = context.params.id;
    const res = await CMSEmailsSent.readItem(id);

    if (!res || (!res.order_ref && !res.client_query_ref)) {
      return new Response("Not found", {
        status: 404,
      });
    }

    let emailData;

    if (res.order_ref)
      emailData = await orderBranch({
        emailId: id,
        orderId: res.order_ref,
        type: res.type,
      });
    // if (data.client_query_ref) emailData = await orderBranch(data.client_query_ref)

    return new Response(emailData?.html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    });
  }
}

export async function POST(
  request: Request,
  context: { params: { id: UUID } }
) {
  try {
    // TODO [MEDIUM]: Auth
    const id = context.params.id;
    const res = await CMSEmailsSent.readItem(id);

    if (!res || (!res.order_ref && !res.client_query_ref)) {
      return new Response("Not found", {
        status: 404,
      });
    }

    let emailData;

    if (res.order_ref)
      emailData = await orderBranch({
        emailId: id,
        orderId: res.order_ref,
        type: res.type,
        includePlainText: true,
      });
    // if (data.client_query_ref) emailData = await orderBranch(data.client_query_ref)

    const { from, to, subject, html, text } = emailData!;
    const sendEmail = await zeptoApi({
      from,
      to,
      subject,
      htmlBody: html,
      textBody: text as string,
    });

    return new Response(JSON.stringify(sendEmail), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    });
  }
}
