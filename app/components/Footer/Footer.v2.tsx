// TODO [MEDIUM]: Update link with digitalcowboys

import { CMSMeta } from "@/app/api/_cms/collections/meta";
import Link from "next/link";
import { notFound } from "next/navigation";
import Action from "../Actions/Action";
import "./Footer.v2.style.css";

export default async function Footer() {
  const res = await CMSMeta.readLinks('footer')

  if (!res) notFound();

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__menu">
          <ul>
            {res.filter(({ is_category }) => !is_category).map(({ rel_item: { title }, path }) => (
              <li key={path}>
                <Action
                  as="link"
                  href={path}
                  variant="underscored"
                  label={title}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__copyright">
          © 3int UK {new Date().getFullYear()} <span>|</span> developed by{" "}
          <Link href="/">digitalcowboys</Link>
        </div>
      </div>
    </footer>
  );
}
