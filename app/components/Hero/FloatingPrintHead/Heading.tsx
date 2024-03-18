"use client";

import { AnimatePresence, useAnimate } from "framer-motion";

export default function Heading() {
  const [scope, animate] = useAnimate();

  function mouseEnter() {
    animate("#express", {
      opacity: [0, 1],
      y: [30, 0],
      display: "block",
    });
    animate("#exprint", {
      opacity: [1, 0],
      y: [0, -30],
      display: "none",
    });
  }

  function mouseLeave() {
    animate("#express", {
      opacity: [1, 0],
      y: [0, 30],
      display: "none",
    });
    animate("#exprint", {
      opacity: [0, 1],
      y: [-30, 0],
      display: "block",
    });
  }

  return (
    <h1
      ref={scope}
      className="semibold text-8xl uppercase space-y-4 drop-shadow"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onTouchStart={mouseEnter}
      onTouchEnd={mouseLeave}
    >
      <div id="headingEx" className="inline-flex">
        Ex
        <AnimatePresence>
          <span key={1} id="exprint" className="text-[#F1FF00]">
            print
          </span>
          <span key={0} id="express" className="text-white hidden">
            press
          </span>
        </AnimatePresence>
      </div>
      <div>
        <span className="ms-24">Yourself</span>
      </div>
    </h1>
  );
}
