import { CSSProperties } from "react";

interface Props {
  fill?: string;
  width?: string;
  height?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  ref?: any;
}

export default function LogoComplete({
  fill = "#000000",
  stroke = "#000000",
  width = "100%",
  height = "100%",
  strokeWidth = 3,
  className,
  style,
  ref,
}: Props) {
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox="0 0 244 138"
      className={className}
      style={style}
    >
      <path d="M10,86.996L10,101.996C10,101.996 10,127.945 35.993,127.945C61.998,127.945 61.998,101.996 61.998,101.996L61.998,34.999C61.998,34.999 61.998,10 35.993,10C10,10 10,34.999 10,34.999L10,40.999C10,40.999 10,48.998 18,48.998C25.999,48.998 25.996,40.999 25.996,40.999L25.999,34.999C25.999,34.999 25.996,24.999 35.993,24.999C46.002,24.999 46.002,34.999 46.002,34.999L46.002,57.998C46.002,58.793 45.685,59.556 45.123,60.119C44.56,60.682 43.797,60.998 43.002,60.998C37.42,60.998 25.999,60.998 25.999,60.998C25.999,60.998 18,60.998 18,68.997C18,76.997 25.996,76.997 25.996,76.997L43.002,76.997C43.797,76.997 44.56,77.313 45.123,77.876C45.685,78.438 46.002,79.201 46.002,79.997C46.002,86.637 46.002,101.996 46.002,101.996C46.002,101.996 46.002,111.995 35.993,111.995C25.996,111.995 25.999,101.996 25.999,101.996L25.999,96.996" />

      <path d="M77.997,96.996L77.997,119.995C77.997,119.995 77.997,127.995 85.996,127.995C93.996,127.995 93.996,119.995 93.996,119.995L93.996,48.998C93.996,48.998 93.996,40.999 85.996,40.999C77.997,40.999 77.997,48.998 77.997,48.998L77.997,86.996" />

      <path d="M109.995,86.996L109.995,66.997C109.995,66.997 109.995,40.999 135.994,40.999C161.993,40.999 161.993,66.997 161.993,66.997L161.993,119.995C161.993,119.995 161.993,127.995 153.993,127.995C145.994,127.995 145.994,119.995 145.994,119.995L145.994,66.997C145.994,66.997 145.994,56.998 135.994,56.998C125.995,56.998 125.995,66.997 125.995,66.997L125.995,119.995C125.995,119.995 125.995,127.995 117.995,127.995C109.995,127.995 109.995,119.995 109.995,119.995L109.995,96.996" />

      <path d="M197.991,86.996L197.991,59.998C197.991,58.341 196.648,56.998 194.991,56.998C191.437,56.998 185.992,56.998 185.992,56.998C185.992,56.998 177.992,56.998 177.992,48.998C177.992,40.999 185.992,40.999 185.992,40.999L194.991,40.999C196.648,40.999 197.991,39.655 197.991,37.999L197.991,18C197.991,18 197.991,10 205.991,10C213.991,10 213.991,18 213.991,18L213.991,37.999C213.991,39.655 215.334,40.999 216.991,40.999L225.99,40.999C225.99,40.999 233.99,40.999 233.99,48.998C233.99,56.998 225.99,56.998 225.99,56.998L216.991,56.998C215.334,56.998 213.991,58.341 213.991,59.998C213.991,70.357 213.991,103.996 213.991,103.996C213.991,128.994 189.992,127.995 189.992,127.995L185.992,127.995C185.992,127.995 177.992,127.995 177.992,119.995C177.992,111.995 185.992,111.995 185.992,111.995L189.992,111.995C189.992,111.995 197.991,111.995 197.991,103.996L197.991,96.996" />
    </svg>
  );
}
