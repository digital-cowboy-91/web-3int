import GalleryDetail from "@/app/gallery/[id]/GalleryDetail";
import { CMS_Gallery } from "@/cms/items/gallery";
import { notFound } from "next/navigation";
import Modal from "./Modal";
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
    <Modal>
      <GalleryDetail model={res} modalMode={true} />
    </Modal>
  );
}
