"use client";

import useDOMRect from "./DOMRect.hook";

export const FilamentLine = ({ className }: { className?: string }) => {
  // const screenW = useDOMRect("body").width;
  const { x: containerX, width: containerW } = useDOMRect("#navContainer");
  const { x: printHeadX, width: printHeadW } = useDOMRect("#printHead");

  if (!containerX || !printHeadX) return null;

  const pathH = 250;
  const stroke = 6;
  const arc = 30;

  const pathStart = printHeadX + printHeadW / 2 - containerX;

  return (
    <svg
      id="filamentLines"
      className={`${className} opacity-0`}
      width="100%"
      height={pathH + stroke / 2}
    >
      <defs>
        <linearGradient id="filamentLinesGradient">
          <stop offset="0%" stopColor="#0D79F2" stopOpacity={0} />
          <stop offset="20%" stopColor="#0D79F2" />
          <stop offset="100%" stopColor="#0D79F2" />
        </linearGradient>
      </defs>
      {Array(2)
        .fill(0)
        .map((i, index) => {
          return (
            <path
              key={index}
              className={`filamentLine`}
              d={`M${pathStart} 0 V${pathH - arc} A${arc} ${arc} 0 0 1 ${
                pathStart - arc
              } ${pathH} L${stroke / 2 + 100} ${pathH}`}
              strokeWidth={stroke}
              stroke="url(#filamentLinesGradient)"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
    </svg>
  );
};
