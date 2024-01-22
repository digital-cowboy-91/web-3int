import { FINDALL } from "../../../prisma/modelModel";
import ModelList from "./ModelList";

const ModelListWrapper = async () => {
  const db = await FINDALL();

  return <ModelList data={db.data} />;
};

export default ModelListWrapper;
