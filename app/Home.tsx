import { Cart } from "./components/icons/IconCart";
import HeadingAnim from "./components/Hero/FloatingPrintHead/Heading";
import HeroAnimation from "./components/Hero/FloatingPrintHead/Somsing";

export default async function Home() {
  return (
    <>
      <header className="absolute w-full z-10">
        <div className="container flex justify-between items-center font-semibold uppercase text-neutral-700">
          <div className="bg-primary h-[80px] px-4 flex items-center text-white ">
            {/* <LogoSimplifiedAnim height="50" stroke={5} /> */}
            3int UK
          </div>
          <nav>
            <ul className="inline-flex gap-20">
              <li>Gallery / Store</li>
              <li>Services</li>
              <li>FAQ</li>
            </ul>
          </nav>
          <div>
            <Cart className="size-8" />
          </div>
        </div>
      </header>
      <section
        id="new-hero"
        className="css-selector relative overflow-hidden text-neutral-700 w-screen h-screen flex items-center"
      >
        <div className="relative container p-4 h-[500px] flex flex-col justify-center gap-6">
          <HeadingAnim />
          <p className="max-w-[450px] leading-loose italic">
            through our 3D printing services. See the gallery for inspiration or
            contact us if you already have something in mind. Together, let's
            make it real!
          </p>
          <div className="absolute inset-0 -z-10">
            <HeroAnimation />
          </div>
        </div>
        {/* <img
              src="/print_head.svg"
              className="h-[500px] absolute inset-x-1 left-[60%] top-[50%] -translate-x-1/2 -translate-y-[300px] -z-10 drop-shadow-md"
              alt=""
            /> */}
      </section>
    </>
  );
}
