import { CSSContainer } from "@/app/styles";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";
import { CMSGallery } from "@/app/api/_cms/collections/gallery";

export const dynamic = "force-static";

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
  const res = await CMSGallery.readItem(params.id);

  if (!res) notFound();

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-4 md:p-8`}>
        <GalleryDetail model={res} />
      </div>
    </section>
  );
}
