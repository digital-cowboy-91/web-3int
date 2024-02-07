import Logo from "./Logo";

interface Props {
  title: string;
  description: string;
}

const ContactCard = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <h1>{title}</h1>
      <div className="my-auto">
        <Logo height="120px" className="mx-auto mb-5" />
        <p className="text-center max-w-[300px] mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default ContactCard;
