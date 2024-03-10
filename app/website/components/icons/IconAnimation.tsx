type Props = {
  fill?: string;
  stroke?: string;
};

export default function IconAnimation({
  fill = "#ffffff",
  stroke = "#ffffff",
}: Props) {
  return (
    <svg
      width="100%"
      height="100%"
      fill={fill}
      viewBox="0 0 72 72"
      version="1.1"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
    >
      <g>
        <g>
          <circle
            cx="54"
            cy="29.4"
            r="12"
            style={{
              fill,
              stroke,
              strokeWidth: "2px",
            }}
          />
          <path
            d="M42,19.008c-1.824,-1.054 -3.894,-1.608 -6,-1.608c-6.623,0 -12,5.377 -12,12c0,6.623 5.377,12 12,12c2.106,0 4.176,-0.554 6,-1.608c-1.824,1.054 -3.894,1.608 -6,1.608c-6.623,0 -12,-5.377 -12,-12c0,-6.623 5.377,-12 12,-12c2.106,0 4.176,0.554 6,1.608Z"
            style={{
              fill: "none",
              stroke,
              strokeOpacity: 0.75,
              strokeWidth: "2px",
            }}
          />
          <g>
            <path
              d="M24,19.008c-1.824,-1.054 -3.894,-1.608 -6,-1.608c-2.106,0 -4.176,0.554 -6,1.608c1.824,-1.054 3.894,-1.608 6,-1.608c2.106,0 4.176,0.554 6,1.608Z"
              style={{
                fill: "none",
                stroke,
                strokeOpacity: 0.5,
                strokeWidth: "2px",
              }}
            />
            <path
              d="M24,39.792c-1.824,1.054 -3.894,1.608 -6,1.608c-2.106,0 -4.176,-0.554 -6,-1.608c1.824,1.054 3.894,1.608 6,1.608c2.106,0 4.176,-0.554 6,-1.608Z"
              style={{
                fill: "none",
                stroke,
                strokeOpacity: 0.5,
                strokeWidth: "2px",
              }}
            />
            <path
              d="M18,34.2l-12,-0"
              style={{
                fill: "none",
                stroke,
                strokeOpacity: 0.5,
                strokeWidth: "2px",
              }}
            />
            <path
              d="M18,24.6l-12,-0"
              style={{
                fill: "none",
                stroke,
                strokeOpacity: 0.5,
                strokeWidth: "2px",
              }}
            />
            <path
              d="M18,29.4l-14.883,-0"
              style={{
                fill: "none",
                stroke,
                strokeOpacity: 0.5,
                strokeWidth: "2px",
              }}
            />
          </g>
        </g>
        <g>
          <path
            d="M13.2,48.12l-0,5.76c-0,0.397 -0.323,0.72 -0.72,0.72l-5.76,-0c-0.397,-0 -0.72,-0.323 -0.72,-0.72l-0,-5.76c-0,-0.397 0.323,-0.72 0.72,-0.72l5.76,-0c0.397,-0 0.72,0.323 0.72,0.72Z"
            style={{
              fill,
              stroke,
              strokeWidth: "2px",
            }}
          />
          <path
            d="M66,48.12l0,5.76c0,0.397 -0.323,0.72 -0.72,0.72l-5.76,-0c-0.397,-0 -0.72,-0.323 -0.72,-0.72l0,-5.76c0,-0.397 0.323,-0.72 0.72,-0.72l5.76,-0c0.397,-0 0.72,0.323 0.72,0.72Z"
            style={{
              fill,
              stroke,
              strokeWidth: "2px",
            }}
          />
          <path
            d="M18,51l36,0"
            style={{
              fill: "none",
              stroke,
              strokeOpacity: 0.5,
              strokeWidth: "2px",
              strokeDasharray: "4,4,0,0,0,0",
            }}
          />
        </g>
      </g>
    </svg>
  );
}
