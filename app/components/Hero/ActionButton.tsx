"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const transition = {
  type: "spring",
  damping: 10,
  stiffness: 500,
};

const animate = {
  init: {
    zIndex: 0,
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0)",
    transition,
  },
  tap: {
    scale: 1,
    boxShadow: "2.5px 2.5px 15px 2.5px rgba(0, 0, 0, 0.15)",
    transition,
  },
  hover: {
    zIndex: 10,
    scale: 1.02,
    boxShadow: "5px 5px 20px 5px rgba(0, 0, 0, 0.3)",
    transition,
  },
};

const ActionButton = () => {
  const router = useRouter();
  return (
    <motion.button
      variants={animate}
      initial="init"
      whileHover="hover"
      whileTap="tap"
      onClick={() => router.push("/#contact")}
      className="rounded-full font-semibold bg-action text-center py-4 px-8 w-full block shadow text-dark"
    >
      GET FREE QUOTE NOW !
    </motion.button>
  );
};

export default ActionButton;
