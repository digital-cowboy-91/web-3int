import { CMS_Gallery } from "@/cms/items/gallery";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";
import { CSSContainer } from "@/app/styles";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8`}>
        <GalleryDetail model={res} />
      </div>
    </section>
  );
}
