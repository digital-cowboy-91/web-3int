import Background from "./Background";
import { Heading } from "./Heading";

export default async function FloatingPrintHead() {
  return (
    <section
      id="floatingPrintHead"
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      <div className="container p-4 h-[500px] flex flex-col justify-center items-start gap-6">
        <Heading />
        <p className="max-w-[450px] leading-loose italic">
          through our 3D printing services. See the gallery for inspiration or
          contact us if you already have something in mind. Together, let's make
          it real!
        </p>
      </div>
      <Background />
    </section>
  );
}
