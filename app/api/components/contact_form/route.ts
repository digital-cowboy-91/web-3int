import { NextRequest, NextResponse } from "next/server";
import cmsClient from "@/cms/client";
import { readItems, createItem } from "@directus/sdk";

export async function GET(request: NextRequest) {
  const data = await cmsClient.request(readItems("faq"));
  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await cmsClient.request(createItem("faq", body));
  console.log(data);

  return NextResponse.json(data);
}
