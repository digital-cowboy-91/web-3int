import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
// import "./Action.style.css";
// import "./Action.style.v2.css";
// import "./Action.style.v3.css";
import "./Action.style.v4.css";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as: "button";
};
type TAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
};
type TLinkProps = LinkProps & {
  as: "link";
};

type TProps = {
  active?: "button" | "icon";
  className?: string;
  color?: "primary" | "secondary" | "black";
  variant?: "outlined" | "underscored" | "filled";
} & (
  | { icon: ReactNode; label?: string | ReactNode }
  | { icon?: ReactNode; label: string | ReactNode }
) &
  (TButtonProps | TAnchorProps | TLinkProps);

export default function Action({
  active = "button",
  as,
  className,
  color = "secondary",
  icon,
  label,
  variant = "filled",
  ...props
}: TProps) {
  const setClass = [
    "action",
    `active--${active}`,
    `color--${color}`,
    `variant--${variant}`,
    className,
  ]
    .filter((i) => i)
    .join(" ");
  const children = (
    <>
      {icon && <div className={`action__icon`}>{icon}</div>}
      {label}
    </>
  );

  if (as === "button") {
    return (
      <button {...(props as TButtonProps)} className={setClass}>
        {children}
      </button>
    );
  }

  if (as === "a") {
    return (
      <a {...(props as TAnchorProps)} className={setClass}>
        {children}
      </a>
    );
  }

  if (as === "link") {
    return (
      <Link {...(props as TLinkProps)} className={setClass}>
        {children}
      </Link>
    );
  }

  return null;
}
