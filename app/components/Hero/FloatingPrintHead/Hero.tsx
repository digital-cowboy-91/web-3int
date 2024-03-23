import ActionButton from "./ActionButton";
import Background from "./Background";
import Heading from "./Heading";
import PrintHead from "./PrintHead";

export default async function Hero() {
  return (
    <section
      id="floatingPrintHead"
      className="relative lg:w-full lg:h-screen flex items-center overflow-hidden"
    >
      <div className="relative my-[calc(100px+2rem)] md:my-0 gap-8 md:gap-0 lg:mt-0 container grid auto-rows-min lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_40%]">
        <PrintHead className="order-1 lg:order-2" />
        <div className="order-2 lg:order-1 flex flex-col justify-center gap-8 md:gap-4 p-4 md:p-8 min-w-3/4 mx-auto sm:w-auto sm:m-0">
          <Heading />
          <p className="max-w-[450px] leading-loose italic">
            through our 3D printing services. Browse our gallery for inspiration
            and purchases, or contact us if you already have something in mind.
            Together, let's make it real!
          </p>
          <div className="inline-flex justify-end gap-4 font-semibold text-lg mt-4 md:mt-8">
            <ActionButton />
          </div>
        </div>
      </div>
      <Background className="absolute w-full top-0 -z-20" />
      {/* <SketchLines className="absolute left-1/2 -translate-x-1/2 inset-y-0 -z-20" /> */}
    </section>
  );
}
