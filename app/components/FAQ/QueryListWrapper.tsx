import { CMS_FAQ } from "@/cms/items/faq";
import QueryList from "./QueryList";

const QueryListWrapper = async () => {
  const res = await CMS_FAQ.readItems();

  return <QueryList data={res} />;
};

export default QueryListWrapper;
