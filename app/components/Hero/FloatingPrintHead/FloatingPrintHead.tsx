import Somsing from "./Somsing";
import { Heading } from "./Heading";
import Background from "./Background";
import SketchLines from "./SketchLines";

export default async function FloatingPrintHead() {
  return (
    <section
      id="floatingPrintHead"
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      <div className="relative container grid grid-cols-[1fr_300px] h-[500px] gap-6">
        <div className="flex flex-col justify-center items-center">
          <div>
            <Heading />
            <p className="max-w-[450px] leading-loose italic">
              through our 3D printing services. See the gallery for inspiration
              or contact us if you already have something in mind. Together,
              let's make it real!
            </p>
          </div>
        </div>
        <Somsing />
      </div>
      <Background className="absolute w-full h-1/2 top-0 -z-20" />
      <SketchLines className="absolute left-1/2 -translate-x-1/2 inset-y-0 -z-20" />
    </section>
  );
}
