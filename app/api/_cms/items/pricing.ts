import cmsAPI from "../cmsAPI";

const base = "/items/pricing";

type TFeature = {
  description: string;
  additional_information: string;
  is_included: boolean;
};

export type TPricing = {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  features: TFeature[];
};

async function readItems() {
  return await cmsAPI({
    path: base,
    fetchInit: {
      method: "GET",
      next: {
        tags: ["pricing"],
      },
    },
  }).then((res) => res.data as TPricing[]);
}

export const CMS_Pricing = {
  readItems,
};
