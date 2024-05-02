import { title } from "process";
import Action from "../Actions/Action";
import SVGLogoChar_Dynamic from "../Logo/SVGLogoChar_Dynamic";
import "./HeaderV3.style.css";
import MobileMenuButton from "./MobileMenuButton";
import Link from "next/link";
import CartButton from "./CartButton";

const menuItems = [
  {
    title: "Gallery",
    slug: "gallery",
  },
  // {
  //   title: "Pricing",
  //   slug: "pricing",
  // },
  // {
  //   title: "FAQ",
  //   slug: "faq",
  // },
  {
    title: "Contact",
    slug: "contact",
  },
];
export default function Header() {
  return (
    <header id="navigation" data-menu="closed">
      <div id="nav-container" className="wrapper">
        <div className="logo-wrapper">
          <Link href="/">
            <SVGLogoChar_Dynamic />
          </Link>
        </div>

        <div className="buttons-wrapper">
          <MobileMenuButton className="lg:hidden" />
          <CartButton />
        </div>

        <ul className="menu-items">
          <li style={{ "--menu-items-item": 0 } as any}>
            <Action as="link" href="/" label="Home" variant="underscored" />
          </li>
          {menuItems.map((item, index) => (
            <li key={index} style={{ "--menu-items-item": index + 1 } as any}>
              <Action
                as="link"
                href={`/${item.slug}`}
                label={item.title}
                variant="underscored"
              />
            </li>
          ))}
        </ul>
        <div className="background" />
      </div>
    </header>
  );
}
