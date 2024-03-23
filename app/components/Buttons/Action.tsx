import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Action.style.css";

type TProps = (
  | { icon: ReactNode; label?: string | ReactNode }
  | { icon?: ReactNode; label: string | ReactNode }
) &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" })
    | (LinkProps & { as: "a" })
  );

export default function Action({ icon, label, as, ...props }: TProps) {
  const setClass = [
    "v3-action",
    Boolean(icon) ? "v3-action--w-icon" : "v3-action--label",
  ].join(" ");
  const children = (
    <>
      {icon && <div>{icon}</div>}
      {label}
    </>
  );

  if (as === "a") {
    return (
      <Link {...(props as LinkProps)} className={setClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={setClass}
    >
      {children}
    </button>
  );
}
