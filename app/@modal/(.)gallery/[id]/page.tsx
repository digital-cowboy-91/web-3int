import GalleryDetailModal from "@/app/gallery/[id]/GalleryDetailModal";
import { CMS_Gallery } from "@/cms/items/gallery";
import { notFound } from "next/navigation";
import Modal from "./Modal";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return (
    <Modal>
      <GalleryDetailModal model={res} />
    </Modal>
  );
}
