import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  //   const requestHeaders = new Headers(request.headers)
  //   const secret = requestHeaders.get('x-vercel-reval-key')

  //   if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
  //     return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  //   }

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
