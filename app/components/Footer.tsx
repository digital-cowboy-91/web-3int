import { CMSLegal } from "@/app/api/_cms/collections/legal";
import { CSSContainer } from "@/app/styles";
import Link from "next/link";
import { notFound } from "next/navigation";

const Footer = async () => {
  const res = await CMSLegal.readItems();

  if (!res) notFound();

  return (
    <footer className="bg-dark text-light">
      <div className="container p-8 flex flex-col items-center text-center gap-4">
        <ul className="m-0 flex flex-row gap-4 justify-center">
          {res.map(({ title, slug }) => (
            <li key={slug}>
              <Link href={`/legal/${slug}`} className="link-underline-white">
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div id="recaptcha-wrapper"></div>
        <div className={CSSContainer}>© 3INT {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
};

export default Footer;
