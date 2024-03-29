import { notFound } from "next/navigation";
import { CMSGallery } from "../api/_cms/collections/gallery";
import GalleryItem from "./components/GalleryItem";

export default async function Page() {
  const res = await CMSGallery.readItems();

  if (!res) notFound();

  return (
    <section>
      <div className="container grid grid-cols-4 gap-4">
        {res.map((i) => (
          <GalleryItem key={i.id} item={i} />
        ))}
      </div>
    </section>
  );
}
