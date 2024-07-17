import { CMSFAQ } from "@/app/api/_cms/collections/faq";
import FAQView from "./FAQView";

type Props = {
  limit: number;
};

export default async function FAQ({ limit }: Props) {
  const res = await CMSFAQ.readItems();

  if (!res) return null;

  return <FAQView limit={limit} items={res} />;
}
