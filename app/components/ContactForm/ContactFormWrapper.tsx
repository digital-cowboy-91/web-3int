import { ContactForm } from "./ContactForm";

export type TOption = {
  value: string;
  option: string;
};

export const ContactFormWrapper = async () => {
  const options: TOption[] = [
    {
      value: "tier_group",
      option: "Tier: GROUP",
    },
    {
      value: "tier_solo",
      option: "Tier: SOLO",
    },
    {
      value: "tier_cad",
      option: "Tier: CAD",
    },
    {
      value: "website_error",
      option: "Website: Report error",
    },
    {
      value: "website_privacy",
      option: "Website: Privacy Policy",
    },
    {
      value: "website_cookies",
      option: "Website: Cookie Policy",
    },
    {
      value: "general",
      option: "General Topic",
    },
  ];
  return <ContactForm options={options} />;
};
