import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authToken = request.nextUrl.searchParams.get("authToken");

  if (authToken !== process.env.PROJECT_KEY) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.tag && !body.path) {
    return Response.json(
      { message: "You must provide a tag or a path" },
      { status: 400 }
    );
  }

  if (body.tag) {
    revalidateTag(body.tag);
  }

  if (body.path) {
    revalidatePath(body.path);
  }

  return Response.json({ revalidated: true, now: Date.now() });
}
