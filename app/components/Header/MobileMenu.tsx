"use client";

import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { IconCart } from "../icons/IconCart";
import IconMobileMenu from "../icons/IconMobileMenu";
import NavList from "./NavList";
import LogoChar from "../Logo/LogoChar";

export default function MobileMenu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const ref = useRef<HTMLDivElement | null>(null);

  const clipHeight = () => {
    if (!ref?.current) return 0;

    const w = ref.current.offsetWidth;
    const h = ref.current.offsetHeight;

    return (w > h ? w : h) * Math.sqrt(2);
  };

  const background = {
    open: {
      clipPath: `circle(${clipHeight()}px at 40px 40px)`,
    },
    closed: {
      clipPath: "circle(25px at 40px 40px)",
    },
  };

  const navList = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      id="nav-container"
      className="container hidden md:flex justify-between items-center font-semibold uppercase"
      initial={false}
      ref={ref}
      animate={isOpen ? "open" : "closed"}
    >
      <div
        id="navLogo"
        className="bg-primary size-[100px] px-4 flex items-center justify-center"
      >
        <LogoChar height="50px" fill="none" stroke="#ffffff" strokeWidth={5} />
      </div>
      <motion.nav
        initial={false}
        className="size-full p-4"
        ref={ref}
        animate={isOpen ? "open" : "closed"}
      >
        <button onClick={() => toggleOpen()} className="md:hidden">
          <IconMobileMenu className="size-full stroke-white stroke-[3px]" />
        </button>
        <NavList
          className={`text-white md:text-cu ${
            isOpen ? "opacity-1" : "opacity-0"
          } md:opacity-1 transition-opacity`}
        />
      </motion.nav>
      <Link href="/cart">
        <IconCart
          className={`size-full ${
            isOpen ? "stroke-white" : ""
          } transition-colors`}
        />
      </Link>
      <motion.div
        variants={background}
        className="bg-[#0D79F2] absolute -z-10 inset-0 md:hidden"
      />
    </motion.div>
  );
}
