import { CMSFAQ } from "@/app/api/_cms/collections/faq";
import FAQView from "./FAQView";

export default async function FAQ() {
  const res = await CMSFAQ.readItems();

  return <FAQView limit={5} items={res} />;
}
