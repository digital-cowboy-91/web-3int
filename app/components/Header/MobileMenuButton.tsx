"use client";

import IconMobileMenu from "../icons/IconMobileMenu";

export default function MobileMenuButton() {
  return (
    <button
      className="mobile-menu-button"
      onClick={async () => {
        const nav = document.getElementById("navigation") as HTMLDivElement;
        nav.dataset.menu = nav.dataset.menu === "open" ? "closed" : "open";
      }}
    >
      <IconMobileMenu />
    </button>
  );
}
