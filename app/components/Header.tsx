import LogoChar from "../__sandbox/LogoChar";
import LogoComplete from "../__sandbox/LogoComplete";
import { IconCart } from "./icons/IconCart";

export default async function Header() {
  return (
    <header className="absolute w-full z-10">
      <div
        id="navContainer"
        className="container flex justify-between items-center font-semibold uppercase "
      >
        <div
          id="navLogo"
          className="bg-primary size-[100px] px-4 flex items-center justify-center"
        >
          {/* <LogoComplete
            height="50px"
            fill="none"
            stroke="#ffffff"
            strokeWidth={5}
          /> */}
          <LogoChar
            height="50px"
            fill="none"
            stroke="#ffffff"
            strokeWidth={5}
          />
        </div>

        <nav>
          <ul className="inline-flex gap-20">
            <li>Gallery / Store</li>
            <li>Services</li>
            <li>FAQ</li>
          </ul>
        </nav>

        <IconCart className="size-8 m-4" />
      </div>
    </header>
  );
}
