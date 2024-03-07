import { CSSContainer } from "../../styles";
import ActionButton from "./ActionButton";
import LogoButton from "./LogoButton";
import ImageAsset from "../ImageAsset";
import { CMSHomepage } from "@/app/api/_cms/collections/homepage";

export default async function SectionHero() {
  const res = await CMSHomepage.readSingleton();

  return (
    <section id="hero" className="h-screen max-h-[720px]">
      <div
        className={`${CSSContainer} h-full grid md:grid-rows-1 md:grid-cols-2 gap-5 md:rounded-b-[2rem] relative shadow overflow-hidden`}
      >
        <ImageAsset
          asset={res.hero_image}
          preset="h720"
          className="object-cover w-full h-full absolute z-0"
        />
        <div className="col-span-1 w-80 mx-auto z-10">
          <div className="h-3/4 bg-primary flex flex-col justify-center gap-5 rounded-b-[2rem]">
            <LogoButton />
            <h1 className="text-base text-white text-center ms-0 px-4 font-normal">
              {res.motto}
            </h1>
          </div>
          <div className="h-1/4 flex flex-col justify-center">
            <ActionButton />
          </div>
        </div>
      </div>
    </section>
  );
}
