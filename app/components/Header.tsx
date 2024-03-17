import { IconCart } from "./icons/IconCart";

export default async function Header() {
  return (
    <header className="absolute w-full z-10">
      <div
        id="navContainer"
        className="container flex justify-between items-center font-semibold uppercase text-neutral-700"
      >
        <div
          id="navLogo"
          className="bg-primary h-[80px] px-4 flex items-center text-white "
        >
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
          <IconCart className="size-8" />
        </div>
      </div>
    </header>
  );
}
