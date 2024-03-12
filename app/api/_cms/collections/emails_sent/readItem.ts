import { TEmailSent } from ".";
import cmsAPI from "../../cmsAPI";

const base = "/items/emails_sent";

export default async function readItem(id: string) {
  return await cmsAPI({
    path: base,
    id,
    params: ["fields[]=*"],
    fetchInit: {
      method: "GET",
      cache: "no-store",
      // next: {
      //   revalidate: isDraft ? 0 : 60 * 60 * 24,
      // },
    },
    addSecret: true,
  }).then((res) => {
    return res.data as TEmailSent;
  });
}
