"use client";

import IconMobileMenu from "../icons/IconMobileMenu";

export default function MobileMenuButton() {
  return (
    <button
      className="mobile-menu-button"
      onClick={async () => {
        const body = document.querySelector("body") as HTMLBodyElement;
        const nav = document.querySelector("#navigation") as HTMLDivElement;

        body.classList.toggle("modal-lockdown");
        nav.dataset.menu = nav.dataset.menu === "open" ? "closed" : "open";
      }}
    >
      <IconMobileMenu />
    </button>
  );
}
