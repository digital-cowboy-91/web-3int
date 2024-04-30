// TODO:
// - task: Update link with digitalcowboys
//   priority: medium

import { notFound } from "next/navigation";
import "./Footer.v2.style.css";
import { CMSLegal } from "@/app/api/_cms/collections/legal";
import Action from "../Actions/Action";
import Link from "next/link";

export default async function Footer() {
  const res = await CMSLegal.readItems();

  if (!res) notFound();

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__menu">
          <ul>
            {res.map(({ title, slug }) => (
              <li key={slug}>
                <Action
                  as="link"
                  href={`/legal/${slug}`}
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
