type Props = {
  fill?: string;
  stroke?: string;
};

export default function IconTimelapse({
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
      <path
        d="M18.793,11.425c-8.018,5.615 -12.793,14.787 -12.793,24.575c0,16.557 13.443,30 30,30c16.569,0 30,-13.431 30,-30c-0,16.569 -13.431,30 -30,30c-16.557,0 -30,-13.443 -30,-30c0,-9.788 4.775,-18.96 12.793,-24.575Z"
        style={{
          fill: "none",
          stroke: stroke,
          strokeWidth: "2px",
        }}
      />
      <path
        d="M65.579,30.99c-2.432,-14.354 -14.818,-24.891 -29.377,-24.989c-5.266,-0.036 -10.448,1.315 -15.026,3.918c4.578,-2.603 9.76,-3.954 15.026,-3.918c14.559,0.098 26.945,10.635 29.377,24.989Z"
        style={{
          fill: "none",
          stroke: stroke,
          strokeWidth: "2px",
          strokeDasharray: "6,6,0,0,0,0",
        }}
      />
      <path
        d="M52.797,33.921c0.743,0.429 1.2,1.221 1.2,2.079c0,0.858 -0.457,1.65 -1.2,2.079c-6.006,3.465 -17.995,10.381 -23.998,13.844c-0.742,0.429 -1.657,0.429 -2.399,-0c-0.743,-0.429 -1.2,-1.221 -1.2,-2.078c0,-6.929 0,-20.761 0,-27.69c-0,-0.857 0.457,-1.649 1.2,-2.078c0.742,-0.429 1.657,-0.429 2.399,-0c6.003,3.463 17.992,10.379 23.998,13.844Z"
        style={{
          fill: "none",
          stroke: stroke,
          strokeWidth: "2px",
        }}
      />
    </svg>
  );
}
