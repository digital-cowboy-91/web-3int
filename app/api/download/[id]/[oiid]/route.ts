import { CMSFiles } from "@/app/api/_cms/collections/files";
import { CMSOrderItems } from "@/app/api/_cms/collections/order_items";
import { UUID } from "crypto";

export async function GET(
  request: Request,
  context: { params: { id: UUID; oiid: UUID } }
) {
  const { id, oiid } = context.params;

  const res = await CMSOrderItems.readItem(oiid);

  if (!res) {
    return new Response("Not found", { status: 404 });
  }

  if (res.order_ref.id !== id) {
    return new Response("Not found", { status: 404 });
  }

  if (res.order_ref.payment_status !== "succeeded") {
    return new Response("You don't have permission", { status: 403 });
  }

  const file = await CMSFiles.downloadItem(res.product_ref.asset.id);

  return new Response(file.body, {
    headers: {
      ...file.headers,
      "Content-Disposition": `attachment; filename="${res.product_ref.asset.filename_download}"`,
    },
  });
}
