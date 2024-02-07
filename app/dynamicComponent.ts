import React from "react";
import dynamic from "next/dynamic";

const ContactCard = dynamic(() => import("./components/ContactCard"));
const ContactForm = dynamic(() => import("./components/ContactForm"));
const FAQ = dynamic(() => import("./components/FAQ"));
const ModelList = dynamic(() => import("./components/Models"));
const PriceTiers = dynamic(() => import("./components/PriceTiers"));

const SectionDouble = dynamic(() => import("./components/SectionDouble"));
const SectionSingle = dynamic(() => import("./components/SectionSingle"));

export default function dynamicComponent(title: string, props: any) {
  let component = null;

  switch (title) {
    case "ContactCard":
      component = ContactCard;
      break;
    case "ContactForm":
      component = ContactForm;
      break;
    case "ModelList":
      component = ModelList;
      break;
    case "PriceTiers":
      component = PriceTiers;
      break;
    case "FAQ":
      component = FAQ;
      break;
    case "SectionDouble":
      component = SectionDouble;
      break;
    case "SectionSingle":
      component = SectionSingle;
      break;
    default:
      throw new Error(`Component ${component} not found`);
  }

  // @ts-ignore
  return React.createElement(component, props);
}
