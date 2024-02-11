import React from "react";

import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";
import ModelList from "../components/Models";
import PriceTiers from "../components/PriceTiers";

import SectionDouble from "../components/SectionDouble";
import SectionSingle from "../components/SectionSingle";

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
