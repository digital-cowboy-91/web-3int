import GalleryDetail from "@/app/gallery/[id]/GalleryDetail";
import { CMS_Gallery } from "@/app/api/_cms/items/gallery";
import { notFound } from "next/navigation";
import Modal from "./Modal";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return (
    <Modal>
      <GalleryDetail model={res} modalMode={true} />
    </Modal>
  );
}
