// TODO: Linear

import _ from "lodash";

type TProps = {
  id: string;
  className?: string;
  gradient: {
    colors: {
      from: string;
      to: string;
      noise?: string;
    };
    coordinates?: {
      x: number | string;
      y: number | string;
      r?: number | string;
    };
    steps?: {
      offset: number | string;
      opacity: number | string;
    }[];
    type?: "linear" | "radial";
  };
  shape: "circle" | "rect";
  viewbox: string;
};

export default function SVGNoisyGradientShape({
  id,
  className,
  gradient,
  shape,
  viewbox,
}: TProps) {
  const { type, coordinates, colors, steps } = _.merge(
    {
      type: "radial",
      coordinates: {
        x: "50%",
        y: "50%",
        r: "50%",
      },
      colors: {
        noise: "#000000",
      },
      steps: [
        {
          offset: "0%",
          opacity: 1,
        },
        {
          offset: "100%",
          opacity: 0,
        },
      ],
    },
    gradient
  );

  return (
    <svg id={id} className={className} viewBox={viewbox}>
      <defs>
        <filter id={"noiseFilter" + id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves="1"
            stitchTiles="stitch"
            result={"feTurbulence" + id}
          />
          <feComposite
            in="SourceGraphic"
            in2={"feTurbulence" + id}
            operator="in"
          />
          <feColorMatrix
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 -1 "
            result={"feColorMatrix" + id}
          />
          <feFlood
            floodOpacity="1"
            floodColor={colors.noise}
            result={"feFlood" + id}
          />
          <feMerge result="merge">
            <feMergeNode in={"feFlood" + id} />
            <feMergeNode in={"feColorMatrix" + id} />
          </feMerge>
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        <radialGradient
          id={"grad" + id}
          cx={coordinates.x}
          cy={coordinates.y}
          r={coordinates.r}
          gradientUnits="userSpaceOnUse"
        >
          {steps.map((s, index) => (
            <stop
              key={index}
              offset={s.offset}
              stopColor={colors.from}
              stopOpacity={s.opacity}
            />
          ))}
        </radialGradient>
      </defs>
      {shape === "circle" && (
        <>
          <circle
            cx="50%"
            cy="50%"
            r="50%"
            fill={colors.to}
            filter={`url(#noiseFilter${id})`}
          />
          <circle cx="50%" cy="50%" r="50%" fill={`url(#grad${id})`} />
        </>
      )}
      {shape === "rect" && (
        <>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={colors.to}
            filter={`url(#noiseFilter${id})`}
          />
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#grad${id})`}
          />
        </>
      )}
    </svg>
  );
}
