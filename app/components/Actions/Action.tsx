import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
// import "./Action.style.css";
// import "./Action.style.v2.css";
// import "./Action.style.v3.css";
import "./Action.style.v4.css";

type TProps = {
  active?: "button" | "icon";
  className?: string;
  color?: "primary" | "secondary" | "black";
  variant?: "outlined" | "underscored" | "filled";
} & (
  | { icon: ReactNode; label?: string | ReactNode }
  | { icon?: ReactNode; label: string | ReactNode }
) &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" })
    | (LinkProps & { as: "a" })
  );

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
