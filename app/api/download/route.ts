import { CMSOrders } from "../_cms/collections/orders";
import { CMSProducts } from "../_cms/collections/products";

async function fetchFile(id: string, filename: string) {
  const file = await fetch(
    `${process.env.CMS_HOST}/assets/${id}?download&access_token=${process.env.CMS_DRAFT_TOKEN}`,
    {
      cache: "no-store",
    }
  );

  return new Response(file.body, {
    headers: {
      ...file.headers,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pid = searchParams.get("pid");
  const oid = searchParams.get("oid");

  if (pid) {
    const data = await CMSProducts.readDigital(pid);

    if (data && data.price === 0) {
      return fetchFile(data.asset.id, data.asset.filename_download);
    }
  }

  if (oid) {
    const data = await CMSOrders.readDigital(oid);

    if (data && data.payment_state === 3) {
      return fetchFile(
        data.product_ref.asset.id,
        data.product_ref.asset.filename_download
      );
    }
  }

  return new Response("Invalid request", { status: 400 });
}
