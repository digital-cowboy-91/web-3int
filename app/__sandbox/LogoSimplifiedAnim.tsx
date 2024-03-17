"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  color?: string;
  width?: string;
  height?: string;
  stroke?: number;
  className?: string;
  onClick?: () => void;
}

const animate = {
  init: { pathLength: 0 },
  anim: { pathLength: 1, transition: { duration: 3 } },
  hover: { pathLength: 0, transition: { duration: 3 } },
};

const animateSvg = {
  init: {},
  anim: {},
  hover: {},
};

const LogoSimplifiedAnim = ({
  color,
  width,
  height,
  stroke,
  className,
  onClick,
}: Props) => {
  const router = useRouter();
  return (
    <motion.svg
      variants={animateSvg}
      initial="init"
      animate="anim"
      whileHover="hover"
      width={width || "100%"}
      height={height || "100%"}
      fill={color || "#000000"}
      strokeWidth={stroke || 3}
      viewBox="0 0 208 120"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <g transform="matrix(0.259354,0,0,0.259354,-58.1586,46.6604)">
        <g transform="matrix(3.85573,0,0,3.85573,224.244,-179.91)">
          <motion.path
            stroke="white"
            strokeWidth={stroke}
            fill="transparent"
            variants={animate}
            d="M0.659,77.946L0.659,92.785C0.659,92.785 0.659,118.457 26.374,118.457C52.101,118.457 52.101,92.785 52.101,92.785L52.101,26.503C52.101,26.503 52.101,1.771 26.374,1.771C0.659,1.771 0.659,26.503 0.659,26.503L0.659,32.439C0.659,32.439 0.659,40.353 8.573,40.353C16.487,40.353 16.484,32.439 16.484,32.439L16.487,26.503C16.487,26.503 16.484,16.61 26.374,16.61C36.276,16.61 36.276,26.503 36.276,26.503L36.276,48.267C36.276,50.453 34.504,52.224 32.319,52.224C26.544,52.224 16.487,52.224 16.487,52.224C16.487,52.224 8.573,52.224 8.573,60.139C8.573,68.053 16.484,68.053 16.484,68.053L32.319,68.053C34.504,68.053 36.276,69.824 36.276,72.01C36.276,78.996 36.276,92.785 36.276,92.785C36.276,92.785 36.276,102.678 26.374,102.678C16.484,102.678 16.487,92.785 16.487,92.785L16.487,87.838"
          />
        </g>
        <g transform="matrix(3.85573,0,0,3.85573,224.244,-179.91)">
          <motion.path
            stroke="white"
            strokeWidth={stroke}
            fill="transparent"
            variants={animate}
            d="M62,88L62,111C62,111 62,119 70,119C78,119 78,111 78,111L78,9C78,9 78,1 70,1C62,1 62,9 62,9L62,78"
          />
        </g>
        <g transform="matrix(3.85573,0,0,3.85573,224.244,-179.91)">
          <motion.path
            stroke="white"
            strokeWidth={stroke}
            fill="transparent"
            variants={animate}
            d="M89,78L89,58C89,58 89,32 115,32C141,32 141,58 141,58L141,111C141,111 141,119 133,119C125,119 125,111 125,111L125,58C125,58 125,48 115,48C105,48 105,58 105,58L105,111C105,111 105,119 97,119C89,119 89,111 89,111L89,88"
          />
        </g>
        <g transform="matrix(3.85573,0,0,3.85573,224.244,-179.91)">
          <motion.path
            stroke="white"
            strokeWidth={stroke}
            fill="transparent"
            variants={animate}
            d="M170,78L170,52C170,50.939 169.579,49.922 168.828,49.172C168.078,48.421 167.061,48 166,48C162.51,48 158,48 158,48C158,48 150,48 150,40C150,32 158,32 158,32L166,32C167.061,32 168.078,31.579 168.828,30.828C169.579,30.078 170,29.061 170,28C170,21.412 170,9 170,9C170,9 170,1 178,1C186,1 186,9 186,9L186,28C186,29.061 186.421,30.078 187.172,30.828C187.922,31.579 188.939,32 190,32C193.49,32 198,32 198,32C198,32 206,32 206,40C206,48 198,48 198,48L190,48C188.939,48 187.922,48.421 187.172,49.172C186.421,49.922 186,50.939 186,52C186,63.36 186,95 186,95C186,120 162,119 162,119L158,119C158,119 150,119 150,111C150,103 158,103 158,103L162,103C162,103 170,103 170,95L170,88"
          />
        </g>
      </g>
    </motion.svg>
  );
};

export default LogoSimplifiedAnim;
