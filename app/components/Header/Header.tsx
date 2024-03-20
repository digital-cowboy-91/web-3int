"use client";

import Link from "next/link";
import LogoChar from "../Logo/LogoChar";
import { IconCart } from "../icons/IconCart";
import IconMobileMenu from "../icons/IconMobileMenu";
import "./Header.style.css";
import useAnimation from "./Header.hook";

const menuItems = ["Gallery / Store", "Services", "FAQ"];
export default function Header() {
  const { scope, toggleMenu } = useAnimation();

  return (
    <header ref={scope} id="navigation">
      <div id="nav-container" className="wrapper">
        <div className="logo-wrapper">
          <LogoChar />
        </div>

        <div className="buttons-wrapper">
          <button className="mobile-menu-button" onClick={() => toggleMenu()}>
            <IconMobileMenu />
          </button>
          <Link className="cart-link" href="/cart">
            <IconCart className="size-full" />
          </Link>
        </div>

        <ul className="menu-items">
          <li>Home</li>
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="background" />
      </div>
    </header>
  );
}
