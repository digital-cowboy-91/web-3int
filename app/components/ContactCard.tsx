import Logo from "./Logo";

interface Props {
  title: string;
}

const ContactCard = ({ title }: Props) => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <h1>{title}</h1>
      <div className="my-auto">
        <Logo height="120px" className="mx-auto mb-5" />
        <p className="text-center max-w-[300px] mx-auto">
          Need a consultation, a non-binding request, or want to make an order?
          Just fill out the form. We are here to help
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
