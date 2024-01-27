import { NextRequest, NextResponse } from "next/server";
import cmsClient from "@/cms/client";
import { readItems, createItem } from "@directus/sdk";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await cmsClient.request(createItem("customer_queries", body));

  return NextResponse.json(data);
}
