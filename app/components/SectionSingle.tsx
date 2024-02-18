import dynamicComponent from "../lib/dynamicComponent";
import { CSSContainer } from "../styles";

type Component = {
  component: string;
  props?: any;
};

interface Props {
  title: string;
  description?: string;
  slug: string;
  child1: Component;
  image?: string;
  imageAlt?: string;
  classNames?: {
    section?: string;
    container?: string;
    column1?: string;
    image?: string;
  };
}
export default async function SectionSingle({
  title,
  description,
  slug,
  child1,
  image,
  imageAlt = "",
  classNames,
}: Props) {
  return (
    <section id={slug} className={classNames?.section}>
      <div className={`${CSSContainer} my-8 ${classNames?.container}`}>
        <div className="p-8 flex flex-col gap-4">
          <h1 className="z-10 text-2xl uppercase">{title}</h1>
          {description && <p className="md:w-6/12 z-10">{description}</p>}
          {image && (
            <img
              className="absolute end-0 top-[-130px] w-[320px] hidden md:block"
              src={image}
              alt={imageAlt}
              width={320}
            />
          )}
        </div>
        {dynamicComponent(child1.component, child1.props)}
      </div>
    </section>
  );
}
