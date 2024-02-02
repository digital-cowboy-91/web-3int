// import { NextRequest, NextResponse } from "next/server";
import cmsClient from "@/cms/client";
import { readItems } from "@directus/sdk";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  console.log("params", params);

  const data = await cmsClient.request(
    readItems("legals", {
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
