import Background from "./Background";
import Heading from "./Heading";
import PrintHead from "./PrintHead";
import SketchLines from "./SketchLines";

export default async function Hero() {
  return (
    <section
      id="floatingPrintHead"
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      <div className="relative container p-4 ps-[calc(100px+1rem)] grid md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_40%] h-[500px] gap-6">
        <div className="flex flex-col justify-center gap-4">
          <Heading />
          <p className="max-w-[450px] leading-loose italic">
            through our 3D printing services. Browse our gallery for inspiration
            and purchases, or contact us if you already have something in mind.
            Together, let's make it real!
          </p>
          <div className="inline-flex justify-end gap-4 font-semibold text-lg mt-8">
            {/* <button className="rounded-md drop-shadow border-[3px] border-primary px-20 py-2 uppercase">
              Gallery
            </button> */}
            <button className="rounded-md shadow-md bg-[#F1FF00] px-20 py-2 uppercase">
              Get Quote
            </button>
          </div>
        </div>
        <PrintHead />
      </div>
      <Background className="absolute w-full top-0 -z-20" />
      <SketchLines className="absolute left-1/2 -translate-x-1/2 inset-y-0 -z-20" />
    </section>
  );
}
