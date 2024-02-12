import { CMS_Gallery } from "@/cms/items/gallery";
import ModelList from "./ModelList";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

const ModelListWrapper = async () => {
  const { isEnabled } = draftMode();

  let res;

  if (isEnabled) {
    res = await CMS_Gallery.previewItems();
  } else {
    res = await CMS_Gallery.readItems();
  }

  if (!res) notFound();

  return <ModelList data={res} />;
};

export default ModelListWrapper;
