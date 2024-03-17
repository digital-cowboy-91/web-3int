"use client";

import useDOMRect from "./DOMRect.hook";

export default function SketchLines({ className }: { className?: string }) {
  const containerW = useDOMRect("#navContainer").width;
  const logoW = useDOMRect("#navLogo").width;

  if (!containerW) return null;

  return (
    <svg
      width={containerW + 2 + "px"}
      height="100%"
      className={`stroke-1 stroke-dark fill-none opacity-20 -z-10 ${className}`}
    >
      {Array("1px", logoW + "px", "50%", containerW + 1 + "px").map(
        (i, index) => (
          <line key={index} x1={i} y1="0" x2={i} y2="100%" />
        )
      )}
    </svg>
  );
}
