"use client";

import useDOMRect from "../Hero/FloatingPrintHead/DOMRect.hook";
import NoisyGradientShape from "../Hero/HeroV3/NoisyGradientShape";
import "./FooterBg.style.css";

export default function FooterBg() {
  const { width, height } = useDOMRect("footer");

  return (
    <NoisyGradientShape
      id="footerBg"
      className="size-full absolute inset-0 -z-50"
      shape="rect"
      viewbox={`0 0 ${width} ${height}`}
      gradient={{
        colors: {
          from: "var(--invert--def-grad-from)",
          to: "var(--invert--def-grad-to)",
          noise: "var(--invert--def-grad-noise)",
        },
        coordinates: {
          x: "50%",
          y: "100%",
          r: "50%",
        },
        steps: [
          {
            offset: "0%",
            opacity: 0,
          },
          {
            offset: "100%",
            opacity: 1,
          },
        ],
      }}
    />
  );
}
