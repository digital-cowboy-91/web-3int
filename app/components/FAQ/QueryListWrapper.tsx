import { getFAQ } from "@/cms/items/faq";
import QueryList from "./QueryList";

const QueryListWrapper = async () => {
  const res = await getFAQ();

  return <QueryList data={res} />;
};

export default QueryListWrapper;
