import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const exit = searchParams.get("exit");

  if (exit) {
    draftMode().disable();

    return new Response(null, {
      status: 200,
    });
  }

  const path = searchParams.get("path");

  if (!path) {
    return new Response("Invalid request", { status: 400 });
  }

  draftMode().enable();

  return new Response(null, {
    status: 307,
    headers: {
      Location: `${path}`,
    },
  });
}
