import { getGalleryItems } from "@/cms/items/gallery";
import { FINDALL } from "../../../prisma/modelModel";
import ModelList from "./ModelList";

const ModelListWrapper = async () => {
  const res = await getGalleryItems();

  return <ModelList data={res} />;
};

export default ModelListWrapper;
