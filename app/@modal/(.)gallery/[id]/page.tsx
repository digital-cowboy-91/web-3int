import { CMS_Gallery } from "@/app/api/_cms/items/store/gallery";
import GalleryDetail from "@/app/gallery/[id]/GalleryDetail";
import { notFound } from "next/navigation";
import Modal from "../../Modal";

export const dynamic = "force-static";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Gallery.readItem(params.id);

  if (!res) notFound();

  return (
    <Modal>
      <GalleryDetail model={res} modalMode={true} />
    </Modal>
  );
}
