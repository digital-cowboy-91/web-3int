"use client";

import Action from "../Actions/Action";

export default function MobileMenuButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Action
      id="mobile-menu-button"
      as="button"
      className={className}
      active="icon"
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        >
          <path d="M4,6 L14,6" />
          <path d="M4,12 L20,12" />
          <path d="M10,18 L20,18" />
        </svg>
      }
      onClick={async () => {
        const body = document.querySelector("body") as HTMLBodyElement;
        const nav = document.querySelector("#navigation") as HTMLDivElement;

        body.classList.toggle("modal-lockdown");
        nav.dataset.menu = nav.dataset.menu === "open" ? "closed" : "open";
      }}
    />
  );
}
