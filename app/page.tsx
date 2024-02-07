import { CMS_Homepage } from "@/cms/items/homepage";
import SectionDouble from "./components/SectionDouble";
import SectionSingle from "./components/SectionSingle";

export default async function Home() {
  const res = await CMS_Homepage.readSingleton();

  return (
    <>
      <SectionSingle
        title="Gallery"
        description={res.gallery_description}
        slug="gallery"
        child1={{ component: "ModelList" }}
      />
      <SectionSingle
        title="Pricing"
        slug="pricing"
        description={res.pricing_description}
        child1={{ component: "PriceTiers" }}
        image="https://cms.3int.uk/assets/65be85a3-439f-4997-8623-4dc294db4549"
        classNames={{
          container: "md:rounded-[2rem] bg-primary text-white relative shadow",
        }}
      />
      <SectionSingle title="FAQ" slug="faq" child1={{ component: "FAQ" }} />
      <SectionDouble
        title="Contact"
        slug="contact"
        child1={{
          component: "ContactCard",
          props: { title: "Contact", description: res.contact_description },
        }}
        child2={{ component: "ContactForm" }}
      />
    </>
  );
}
