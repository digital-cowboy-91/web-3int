import Image from "@/app/components/Image";
import { CSSContainer } from "../../styles";
import ActionButton from "./ActionButton";
import LogoButton from "./LogoButton";

export default async function SectionHero() {
  return (
    <section id="hero" className="h-screen max-h-[720px]">
      <div
        className={`${CSSContainer} h-full grid md:grid-rows-1 md:grid-cols-2 gap-5 md:rounded-b-[2rem] relative shadow overflow-hidden`}
      >
        <Image
          wrapperClassName="absolute"
          className="object-cover"
          src="https://assets.3int.uk/3int/hero_image.png"
          alt=""
          sizes="1280px"
          fill
          priority
        />
        <div className="col-span-1 w-80 mx-auto z-10">
          <div className="h-3/4 bg-primary flex flex-col justify-center gap-5 rounded-b-[2rem]">
            <LogoButton />
            <p className="text-base text-white text-center ms-0">
              on-demand 3D Printing service
              <br />
              for all your needs
            </p>
          </div>
          <div className="h-1/4 flex flex-col justify-center">
            <ActionButton />
          </div>
        </div>
      </div>
    </section>
  );
}
