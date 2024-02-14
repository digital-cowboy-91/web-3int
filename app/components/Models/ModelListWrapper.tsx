import { CMS_Gallery } from "@/app/api/_cms/items/gallery";
import { notFound } from "next/navigation";
import ModelList from "./ModelList";

const ModelListWrapper = async () => {
  const res = await CMS_Gallery.readItems();

  if (!res) notFound();

  return <ModelList data={res} />;
};

export default ModelListWrapper;
