import { CMS_Gallery } from "@/cms/items/gallery";
import { notFound } from "next/navigation";
import GalleryDetail from "./GalleryDetail";
import { CSSContainer } from "@/app/styles";
import { draftMode } from "next/headers";

export default async function Page({ params }: { params: { id: string } }) {
  const { isEnabled } = draftMode();

  let res;

  if (isEnabled) {
    res = await CMS_Gallery.previewItem(params.id);
  } else {
    res = await CMS_Gallery.readItem(params.id);
  }

  if (!res) notFound();

  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8 p-8`}>
        <GalleryDetail model={res} />
      </div>
    </section>
  );
}
