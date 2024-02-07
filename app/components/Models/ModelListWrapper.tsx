import { CMS_Gallery } from "@/cms/items/gallery";
import ModelList from "./ModelList";

const ModelListWrapper = async () => {
  const res = await CMS_Gallery.readItems();

  return <ModelList data={res} />;
};

export default ModelListWrapper;
