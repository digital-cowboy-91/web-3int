import { title } from "process";
import Action from "../Actions/Action";
import SVGLogoChar_Dynamic from "../Logo/SVGLogoChar_Dynamic";
import "./HeaderV3.style.css";
import MobileMenuButton from "./MobileMenuButton";
import Link from "next/link";
import CartButton from "./CartButton";
import { CMSMeta } from "@/app/api/_cms/collections/meta";
import { notFound } from "next/navigation";

export default async function Header() {
  const res = await CMSMeta.readLinks("navbar");

  if (!res) notFound();

  return (
    <header className="navigation" data-menu="closed">
      <div className="wrapper">
        <div className="logo-wrapper">
          <Link href="/">
            <SVGLogoChar_Dynamic />
          </Link>
        </div>
        <div className="buttons-wrapper">
          <MobileMenuButton />
          <CartButton />
        </div>
        <ul className="menu-items">
          <li style={{ "--menu-items-item": 0 } as any}>
            <Action as="link" href="/" label="Home" variant="underscored" />
          </li>
          {res.map(({ rel_item: { title }, path }, index) => (
            <li key={path} style={{ "--menu-items-item": index + 1 } as any}>
              <Action
                as="link"
                href={path}
                variant="underscored"
                label={title}
                invertText
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
