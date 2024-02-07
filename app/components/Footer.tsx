import { GETLEGALMENULINKS } from "@/prisma/modelPage";
import { CSSContainer } from "../styles";
import Link from "next/link";
import { getLegalItems } from "@/cms/items/legal";

const Footer = async () => {
  const res = await getLegalItems();

  return (
    <footer className="bg-gray text-white mt-32 p-8 flex flex-col items-center text-center gap-4">
      <ul className="m-0 flex flex-row gap-4 justify-center">
        {res.map(({ title, slug }) => (
          <li key={slug}>
            <Link
              href={`/legal/${slug}`}
              className="text-white whitespace-nowrap"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div id="recaptcha-wrapper"></div>
      <div className={CSSContainer}>© 3INT {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
