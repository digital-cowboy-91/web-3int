import { CSSContainer } from "@/app/styles";
import dynamicComponent from "../lib/dynamicComponent";

type Component = {
  component: string;
  props?: any;
};

interface Props {
  title: string;
  description?: string;
  slug: string;
  child1: Component;
  child2: Component;
  image?: string;
  classNames?: {
    section?: string;
    container?: string;
    column1?: string;
    column2?: string;
    image?: string;
  };
}

export default async function SectionDouble({
  title,
  description,
  slug,
  child1,
  child2,
  image,
  classNames,
}: Props) {
  return (
    <section id={slug} className="my-8">
      <div
        className={`${CSSContainer} grid md:grid-cols-2 relative shadow md:rounded-[2rem]`}
      >
        <div className="p-8 bg-action md:rounded-s-[2rem]">
          {dynamicComponent(child1.component, child1.props)}
        </div>
        <div className="p-8 bg-white text-dark flex justify-center items-center md:rounded-e-[2rem]">
          {dynamicComponent(child2.component, child2.props)}
        </div>
      </div>
    </section>
  );
}
