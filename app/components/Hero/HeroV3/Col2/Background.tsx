export default function Background({ className }: { className?: string }) {
  return (
    <svg className="size-full" viewBox="0 0 500 500">
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
            floodColor="#009055"
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
          cx="50%"
          cy="50%"
          r="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00D8AE" stopOpacity={1} />
          <stop offset="50%" stopColor="#04A586" stopOpacity={0.5} />
          <stop offset="66%" stopColor="#04A586" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle
        cx="50%"
        cy="50%"
        r="50%"
        fill="#04A586"
        filter="url(#noiseFilter)"
      />
      <circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
    </svg>
  );
}
