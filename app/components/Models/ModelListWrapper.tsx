import { notFound } from "next/navigation";
import ModelList from "./ModelList";
import { CMSGallery } from "@/app/api/_cms/collections/gallery";

const ModelListWrapper = async () => {
  const res = await CMSGallery.readItems();

  if (!res) notFound();

  return <ModelList data={res} />;
};

export default ModelListWrapper;
