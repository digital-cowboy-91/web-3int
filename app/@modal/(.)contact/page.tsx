import ContactForm from "@/app/contact/ContactForm";
import Modal from "../Modal.v2";

export const dynamic = "force-static";

export default async function Page() {
  return (
    <Modal>
      <ContactForm />
    </Modal>
  );
}
