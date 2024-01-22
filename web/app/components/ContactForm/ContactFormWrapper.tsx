import { FINDALL } from "../../../prisma/modelContactFormOption";
import { ContactForm } from "./ContactForm";

export const ContactFormWrapper = async () => {
  const db = await FINDALL();

  return <ContactForm options={db.data} />;
};
