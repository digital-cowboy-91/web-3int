import { CMSGallery } from "@/app/api/_cms/collections/gallery";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";

// export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { product: string };
}) {
  const res = await CMSGallery.readItem(params.product);

  if (!res) notFound();

  return {
    title: res.seo.title,
    description: res.seo.description,
    keywords: res.seo.keywords,
  };
}

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  return (
    <section>
      <GalleryDetail modelId={params.product} />
    </section>
  );
}
