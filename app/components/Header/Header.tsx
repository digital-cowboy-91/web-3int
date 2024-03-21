import Link from "next/link";
import LogoChar from "../Logo/LogoChar";
import { IconCart } from "../icons/IconCart";
import "./Header.style.css";
import MobileMenuButton from "./MobileMenuButton";

const menuItems = ["Gallery / Store", "Services", "FAQ"];
export default function Header() {
  return (
    <header id="navigation" data-menu="closed">
      <div id="nav-container" className="wrapper">
        <div className="logo-wrapper">
          <LogoChar />
        </div>

        <div className="buttons-wrapper">
          <MobileMenuButton />
          <Link className="cart-link" href="/cart">
            <IconCart className="size-full" />
          </Link>
        </div>

        <ul className="menu-items">
          <li style={{ "--menu-items-item": 0 } as any}>Home</li>
          {menuItems.map((item, index) => (
            <li key={index} style={{ "--menu-items-item": index + 1 } as any}>
              {item}
            </li>
          ))}
        </ul>
        <div className="background" />
      </div>
    </header>
  );
}
