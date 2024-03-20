"use client";

import useDOMRect from "./DOMRect.hook";

export const FilamentLine = ({ className }: { className?: string }) => {
  const { x: containerX } = useDOMRect("#nav-container");
  const {
    x: printHeadX,
    width: printHeadW,
    height: printHeadH,
  } = useDOMRect("#printHeadContainer");

  const pathH = 250;
  const stroke = 6;
  const arc = 30;

  const pathStart = printHeadX + printHeadW / 2 - containerX;

  return (
    <svg
      id="filamentLines"
      className={`${className} absolute inset-x-0 -z-10 opacity-0`}
      width="100%"
      height={pathH + stroke / 2}
      style={{
        top: printHeadH / 2,
      }}
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
              } ${pathH} L${stroke / 2 + 20} ${pathH}`}
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
