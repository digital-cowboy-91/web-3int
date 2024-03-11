import { draftMode } from "next/headers";
import cmsAPI from "../../cmsAPI";

const base = "/items/orders";

export default async function readItem(id: string) {
  const { isEnabled: isDraft } = draftMode();
  return await cmsAPI({
    path: base,
    id,
    params: [
      "fields[]=*",
      "fields[]=customer_ref.email",
      "fields[]=item_refs.*",
      "fields[]=item_refs.product_ref.is_digital",
      "fields[]=item_refs.product_ref.gallery_ref.title",
      "fields[]=item_refs.product_ref.gallery_ref.cover_image",
    ],
    fetchInit: {
      method: "GET",
      cache: "no-store",
      // next: {
      //   revalidate: isDraft ? 0 : 60 * 60 * 24,
      // },
    },
    addSecret: true,
  }).then((res) => res.data);
}
