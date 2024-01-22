"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  href: string;
  children?: ReactNode;
  className?: string;
  softNavigation?: boolean;
  scroll?: boolean;
}

const Link = ({
  href,
  children,
  className,
  softNavigation = false,
  scroll = true,
}: Props) => {
  const router = useRouter();
  return (
    <a
      href={href}
      className={"cursor-pointer " + className}
      onClick={(e) => {
        if (softNavigation) {
          e.preventDefault();
          router.push(href, { scroll });
        }
      }}
    >
      {children}
    </a>
  );
};

export default Link;
