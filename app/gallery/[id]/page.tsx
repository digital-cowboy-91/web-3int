import { CSSContainer } from "@/app/styles";
import { CMS_Gallery } from "@/app/api/_cms/items/gallery";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-8`}>
        <GalleryDetail model={res} />
      </div>
    </section>
  );
}
