import { CSSContainer } from "@/app/styles";
import { CMS_Gallery } from "@/app/api/_cms/items/gallery";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return {
    title: res.seo.title,
    description: res.seo.description,
    keywords: res.seo.keywords,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-4 md:p-8`}>
        <GalleryDetail model={res} />
      </div>
    </section>
  );
}
