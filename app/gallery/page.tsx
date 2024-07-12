import { notFound } from "next/navigation";
import { CMSGallery } from "../api/_cms/collections/gallery";
import GalleryItem from "./components/GalleryItem";

export default async function Page() {
  const res = await CMSGallery.readItems();

  if (!res) notFound();

  return (
    <section>
      <div className="container grid grid-cols-[repeat(auto-fill,250px)] place-content-center g__gap-sm g__p-sm">
        {res.map((i) => (
          <GalleryItem key={i.id} item={i} />
        ))}
      </div>
    </section>
  );
}
