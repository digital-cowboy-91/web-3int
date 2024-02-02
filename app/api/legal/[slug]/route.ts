import cmsClient from "@/directus/client";
import { readItems } from "@directus/sdk";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const data = await cmsClient.request(
    readItems("legal", {
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
    })
  );

  if (data.length === 0) {
    return Response.json(new Error("Not found"), { status: 404 });
  }

  return Response.json(data, { status: 200 });
}
