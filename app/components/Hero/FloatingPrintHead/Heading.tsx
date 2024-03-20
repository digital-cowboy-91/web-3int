"use client";

import { AnimatePresence, useAnimate } from "framer-motion";

export default function Heading() {
  const [scope, animate] = useAnimate();

  function mouseEnter() {
    animate("#headingExpress", {
      opacity: [0, 1],
      y: [30, 0],
      display: "block",
    });
    animate("#headingExprint", {
      opacity: [1, 0],
      y: [0, -30],
      display: "none",
    });
  }

  function mouseLeave() {
    animate("#headingExpress", {
      opacity: [1, 0],
      y: [0, 30],
      display: "none",
    });
    animate("#headingExprint", {
      opacity: [0, 1],
      y: [-30, 0],
      display: "block",
    });
  }

  return (
    <h1
      ref={scope}
      className="semibold text-6xl sm:text-8xl uppercase drop-shadow flex flex-col"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      // onTouchStart={mouseEnter}
      // onTouchEnd={mouseLeave}
    >
      <div id="headingEx" className="leading-tight inline-flex">
        Ex
        <AnimatePresence>
          <span key={1} id="headingExprint" className="text-[#F1FF00]">
            print
          </span>
          <span key={0} id="headingExpress" className="text-white hidden">
            press
          </span>
        </AnimatePresence>
      </div>
      <div className="leading-tight text-right">Yourself</div>
    </h1>
  );
}
