"use client";
import { motion } from "framer-motion";

interface Props {
  fill?: string;
  width?: string;
  height?: string;
  stroke?: string;
  strokeWidth?: number;
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

export default function LogoChar({
  fill = "#000000",
  stroke = "#000000",
  width = "100%",
  height = "100%",
  strokeWidth = 3,
  className,
  onClick,
}: Props) {
  return (
    <motion.svg
      variants={animateSvg}
      initial="init"
      animate="anim"
      whileHover="hover"
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox="0 0 72 138"
      onClick={onClick}
      className={className}
    >
      <motion.path
        variants={animate}
        d="M10,87.032L10,102.039C10,102.039 10,128 35.993,128C61.998,128 61.998,102.039 61.998,102.039L61.998,35.011C61.998,35.011 61.998,10 35.993,10C10,10 10,35.011 10,35.011L10,41.013C10,41.013 10,49.016 18,49.016C25.999,49.016 25.996,41.013 25.996,41.013L25.999,35.011C25.999,35.011 25.996,25.006 35.993,25.006C46.002,25.006 46.002,35.011 46.002,35.011L46.002,58.02C46.002,58.816 45.685,59.579 45.123,60.142C44.56,60.705 43.797,61.021 43.002,61.021C37.42,61.021 25.999,61.021 25.999,61.021C25.999,61.021 18,61.021 18,69.025C18,77.028 25.996,77.028 25.996,77.028L43.002,77.028C43.797,77.028 44.56,77.344 45.123,77.907C45.685,78.47 46.002,79.234 46.002,80.03C46.002,86.673 46.002,102.039 46.002,102.039C46.002,102.039 46.002,112.043 35.993,112.043C25.996,112.043 25.999,102.039 25.999,102.039L25.999,97.037"
      />
    </motion.svg>
  );
}
