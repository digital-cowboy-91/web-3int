import { CMSFAQ } from "@/app/api/_cms/collections/faq";
import QueryList from "./QueryList";

const QueryListWrapper = async () => {
  const res = await CMSFAQ.readItems();

  return <QueryList data={res} />;
};

export default QueryListWrapper;
