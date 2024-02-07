import { CSSContainer } from "../styles";
import NavLink from "./NavLink";

const sections = [
  { title: "Gallery", slug: "gallery" },
  { title: "Pricing", slug: "pricing" },
  { title: "FAQ", slug: "faq" },
  { title: "Contact", slug: "contact" },
];

export default async function Navbar() {
  return (
    <header className="absolute w-full z-10">
      <nav
        className={`${CSSContainer} px-8 flex flex-row justify-center md:justify-end bg-opacity-30 md:bg-transparent md:py-1`}
      >
        <ul className="flex gap-4 md:gap-8 my-8 ms-0">
          {sections.map(({ title, slug }) => (
            <li key={slug}>
              <NavLink title={title} slug={slug} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
