import LogoChar from "../Logo/LogoChar";
import Action from "../Buttons/Action";
import "./HeaderV3.style.css";
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
          <MobileMenuButton className="lg:hidden" />
          <Action
            as="a"
            href="/"
            variant="outline"
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              >
                <path d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301C4.378 9 6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154c.901 1.153.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z" />
                <path d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4" />
                <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
                <path d="M4.5 18L12 9m7.5 9l-7-8.5m-8 .5L12 21l7.5-11" />
              </svg>
            }
          />
        </div>

        <ul className="menu-items">
          <li style={{ "--menu-items-item": 0 } as any}>
            <Action as="a" href="/" label="Home" variant="underline" />
          </li>
          {menuItems.map((item, index) => (
            <li key={index} style={{ "--menu-items-item": index + 1 } as any}>
              <Action as="a" href="/" label={item} variant="underline" />
            </li>
          ))}
        </ul>
        <div className="background" />
      </div>
    </header>
  );
}
