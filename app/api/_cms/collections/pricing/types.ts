export type TFeature = {
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
