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
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  className,
  onClick,
}: Props) {
  return (
    <motion.svg
      variants={animateSvg}
      initial="init"
      animate="anim"
      whileHover="hover"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={className}
    >
      <motion.path
        variants={animate}
        d="M7.151,15.362l-0,2.798c-0,-0 -0,4.84 4.848,4.84c4.85,0 4.85,-4.84 4.85,-4.84l0,-12.497c0,-0 0,-4.663 -4.85,-4.663c-4.848,0 -4.848,4.663 -4.848,4.663l-0,1.119c-0,0 -0,1.492 1.492,1.492c1.492,0 1.491,-1.492 1.491,-1.492l0.001,-1.119c-0,-0 -0.001,-1.865 1.864,-1.865c1.867,-0 1.867,1.865 1.867,1.865l-0,4.103c-0,0.412 -0.334,0.746 -0.746,0.746c-1.089,0 -2.985,0 -2.985,0c-0,0 -1.492,0 -1.492,1.493c-0,1.492 1.491,1.492 1.491,1.492l2.986,-0c0.412,-0 0.746,0.334 0.746,0.746c-0,1.317 -0,3.917 -0,3.917c-0,-0 -0,1.865 -1.867,1.865c-1.865,-0 -1.864,-1.865 -1.864,-1.865l-0,-0.933"
      />
    </motion.svg>
  );
}
