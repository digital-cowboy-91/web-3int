import { CMSGallery } from "@/app/api/_cms/collections/gallery";
import { notFound } from "next/navigation";
import Modal from "../../Modal";
import GalleryDetail from "@/app/website/gallery/[id]/GalleryDetail";

export const dynamic = "force-static";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMSGallery.readItem(params.id);

  if (!res) notFound();

  return (
    <Modal>
      <GalleryDetail model={res} modalMode={true} />
    </Modal>
  );
}
