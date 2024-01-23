import Link from "next/link";
import { CSSLink } from "../styles";

interface Props {
  title: string;
  slug: string;
}

const NavLink = ({ title, slug }: Props) => {
  return (
    <Link href={"/#" + slug} className={`${CSSLink} text-white`}>
      {title}
    </Link>
  );
};

export default NavLink;
