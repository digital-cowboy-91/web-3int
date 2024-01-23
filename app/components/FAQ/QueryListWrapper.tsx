import { FINDALL } from "../../../prisma/modelFaq";
import QueryList from "./QueryList";

const QueryListWrapper = async () => {
  const db = await FINDALL();

  return <QueryList data={db.data} />;
};

export default QueryListWrapper;
