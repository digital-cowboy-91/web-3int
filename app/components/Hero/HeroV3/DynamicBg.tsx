"use client";

import useDOMRect from "../FloatingPrintHead/DOMRect.hook";
import NoisyGradientShape from "./NoisyGradientShape";

export default function DynamicBg() {
  const { x, y, width, height } = useDOMRect("#printHeadBg");

  return (
    <NoisyGradientShape
      id="heroBg"
      className="size-full absolute inset-0 -z-40"
      shape="rect"
      viewbox={"0 0 100% 100%"}
      gradient={{
        colors: {
          from: "var(--def-grad-from)",
          to: "var(--def-grad-to)",
          noise: "var(--def-grad-noise)",
        },
        coordinates: {
          x: x ? x + width / 2 : "50%",
          y: y ? y + height / 2 : "0%",
          r: "75%",
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
