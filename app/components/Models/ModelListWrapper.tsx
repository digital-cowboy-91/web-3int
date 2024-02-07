import { getGalleryItems } from "@/cms/items/gallery";
import ModelList from "./ModelList";

const ModelListWrapper = async () => {
  const res = await getGalleryItems();

  return <ModelList data={res} />;
};

export default ModelListWrapper;
