import { FINDALL } from "../../prisma/modelHomePage";
import { CSSContainer } from "../styles";
import NavLink from "./NavLink";

export default async function Navbar() {
  const sectionList = await FINDALL();

  if (!sectionList.success) return <div>error</div>;

  return (
    <header className="absolute w-full z-10">
      <nav
        className={`${CSSContainer} px-8 flex flex-row justify-center md:justify-end bg-opacity-30 md:bg-transparent md:py-1`}
      >
        <ul className="flex gap-4 md:gap-8 my-8 ms-0">
          {sectionList.data.map(({ props: { title, slug } }) => (
            <li key={slug}>
              <NavLink title={title} slug={slug} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
