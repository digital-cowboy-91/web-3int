import cmsAPI from "../cmsAPI";

const base = "/items/faq";

export type TFAQ = {
  id: number;
  question: string;
  answer: string;
};

async function readItems() {
  return await cmsAPI(base, {
    method: "GET",
    next: {
      tags: ["faq"],
    },
  }).then((res) => res.data as TFAQ[]);
}

export const CMS_FAQ = {
  readItems,
};
