"use client";

type TProps = {
  className?: string;
  parentDOMRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const FilamentLine = ({ className, parentDOMRect }: TProps) => {
  if (!parentDOMRect) return null;

  const { width, height } = parentDOMRect;

  const stroke = 6;
  const pathStart = stroke / 2;
  const pathH = height / 2;
  const arc = 30;

  return (
    <svg
      id="filamentLines"
      className={`${className} absolute -z-10 opacity-0`}
      width={width * 2}
      height={pathH + stroke / 2}
      style={{
        top: height / 2 + arc,
        left: width / 2 - stroke / 2,
      }}
    >
      <defs>
        <linearGradient id="filamentLinesGradient">
          <stop offset="0%" stopColor="var(--auto-text)" />
          <stop offset="80%" stopColor="var(--auto-text)" />
          <stop offset="100%" stopColor="var(--auto-text)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {Array(2)
        .fill(0)
        .map((i, index) => {
          return (
            <path
              key={index}
              className={`filamentLine`}
              d={`M${pathStart} 0 V${pathH - arc} A${arc} ${arc} 0 0 0 ${
                pathStart + arc
              } ${pathH} L300 ${pathH}`}
              strokeWidth={stroke}
              stroke="url(#filamentLinesGradient)"
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
    </svg>
  );
};
