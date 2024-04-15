"use client";

import useDOMRect from "@/app/lib/DOMRect.hook";
import useSuperSearchParams from "@/app/lib/superSearchParams.hook";
import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";

type TProps = {
  children: ReactNode;
  className?: string;
  defaultActive?: boolean;
  panelId: string;
};

export default function Tab({
  children,
  className,
  defaultActive = false,
  panelId,
}: TProps) {
  const ref = useRef(null);
  const windowResize = useDOMRect("html");
  const { updateQueryWith, queryContains } = useSuperSearchParams();

  const tabParam = queryContains("tab", panelId);
  const tabActive = tabParam === undefined ? defaultActive : tabParam;

  const togglePanel = () => {
    if (!ref.current) return;

    const refHidden = getComputedStyle(ref.current).display === "none";

    document
      .querySelector(`[data-tab-panel="${panelId}"]`)
      ?.setAttribute(
        "data-tab-panel-active",
        refHidden ? "auto" : String(tabActive)
      );
  };

  useEffect(() => {
    togglePanel();
  }, [ref, tabActive, windowResize]);

  return (
    <Link
      ref={ref}
      className={`h-full flex items-center px-9 font-bold transition-colors tab__trigger ${
        tabActive ? "bg-secondary" : "hover:bg-white hover:bg-opacity-10"
      } ${className}`}
      href={{ query: updateQueryWith("tab", panelId) }}
      replace
    >
      {children}
    </Link>
  );
}
