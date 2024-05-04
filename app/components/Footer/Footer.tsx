// TODO [MEDIUM]: Update link with digitalcowboys

import Action from "../Actions/Action";
import "./Footer.style.css";

export default function Footer() {
  return (
    <footer className="footer main-gradient--footer">
      <div className="footer--menu">Menu</div>
      <div className="footer--copyright">
        <div>
          © 3INT {new Date().getFullYear()} <span>|</span> developed by{" "}
          <Action
            as={"link"}
            href={"/"}
            variant="underscored"
            label="digitalcowboys"
          />
        </div>
      </div>
    </footer>
  );
}
