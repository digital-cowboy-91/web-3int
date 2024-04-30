import { CMSGallery } from "@/app/api/_cms/collections/gallery";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";

// export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await CMSGallery.readItem(params.id);

  if (!res) notFound();

  return {
    title: res.seo.title,
    description: res.seo.description,
    keywords: res.seo.keywords,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <section>
      <GalleryDetail modelId={params.id} />
    </section>
  );
}
