import { UUID } from "crypto";
import { CMSProducts } from "../../_cms/collections/products";
import { CMSFiles } from "../../_cms/collections/files";

export async function GET(request: Request, context: { params: { id: UUID } }) {
  const { id } = context.params;

  const res = await CMSProducts.readDigital(id);

  if (!res) {
    return new Response("Not found", { status: 404 });
  }

  if (res.price !== 0) {
    return new Response("You don't have permission", { status: 403 });
  }

  const file = await CMSFiles.downloadItem(res.asset.id as UUID);

  return new Response(file.body, {
    headers: {
      ...file.headers,
      "Content-Disposition": `attachment; filename="${res.asset.filename_download}"`,
    },
  });
}
