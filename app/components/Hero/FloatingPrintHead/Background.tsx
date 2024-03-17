export default function Background({ className }: { className?: string }) {
  return (
    <svg className={className}>
      <defs>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="5"
            numOctaves="1"
            stitchTiles="stitch"
            result="turbulence"
          />
          <feComposite
            in="SourceGraphic"
            in2="turbulence"
            operator="in"
            result="composite1"
            id="feComposite42"
          />
          <feColorMatrix
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 -1 "
            result="color"
            id="feColorMatrix42"
          />
          <feFlood
            floodOpacity="1"
            floodColor="rgb(0,144,85)"
            result="flood"
            id="feFlood42"
          />
          <feMerge result="merge" id="feMerge43">
            <feMergeNode in="flood" id="feMergeNode42" />
            <feMergeNode in="color" id="feMergeNode43" />
          </feMerge>
          <feComposite
            in2="SourceGraphic"
            operator="in"
            result="composite2"
            id="feComposite43"
          />
        </filter>

        <radialGradient
          id="grad"
          cx="75%"
          cy="100%"
          r="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00A561" stopOpacity="0" />
          {/* <stop offset="20%" stopColor="#00F48F" stopOpacity=".2" /> */}
          <stop offset="33%" stopColor="#00F48F" stopOpacity=".5" />
          <stop offset="66%" stopColor="#00F48F" stopOpacity=".75" />
          <stop offset="100%" stopColor="#00F48F" />
        </radialGradient>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="#00A561"
        filter="url(#noiseFilter)"
      />
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  );
}
