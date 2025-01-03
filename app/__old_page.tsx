import { CMSHomepage } from "./api/_cms/collections/homepage";
import SectionDouble from "./components/SectionDouble";
import SectionSingle from "./components/SectionSingle";
import { Suspense } from "react";

export default async function Home() {
  const res = await CMSHomepage.readSingleton();

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
        image="/media/65be85a3-439f-4997-8623-4dc294db4549?key=h320"
        imageAlt="Bambulab P1S"
        classNames={{
          container: "md:rounded-[2rem] bg-primary text-white relative shadow",
        }}
      />
      <SectionSingle title="FAQ" slug="faq" child1={{ component: "FAQ" }} />
      <Suspense fallback={<div>Loading...</div>}>
        <SectionDouble
          title="Contact"
          slug="contact"
          child1={{
            component: "ContactCard",
            props: { title: "Contact", description: res.contact_description },
          }}
          child2={{ component: "ContactForm" }}
        />
      </Suspense>
    </>
  );
}
