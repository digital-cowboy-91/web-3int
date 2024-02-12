import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== process.env.PROJECT_KEY) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const { tags, path } = await request.json();

  if (!tags && !path) {
    return Response.json(
      { message: "You must provide tags or path" },
      { status: 400 }
    );
  }

  if (tags) {
    tags.forEach((tag: string) => {
      tag && revalidateTag(tag);
    });
  }

  if (path) {
    revalidatePath(path);
  }

  return Response.json({ revalidated: true, now: Date.now() });
}
