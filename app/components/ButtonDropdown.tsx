import { useState } from "react";
import { CSSButtonOutline } from "../styles";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

const animateList = {
  init: { opacity: 0 },
  enter: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

export default function ButtonDropdown({
  options,
  activeIndex,
  setActiveIndex,
}: {
  options: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!options?.length) return null;

  return (
    <div className="relative overflow-visible">
      <button
        className={`${CSSButtonOutline} bg-success text-dark flex items-center justify-between gap-2`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-[70px] overflow-hidden text-left">
          {options[activeIndex]}
        </span>
        <ChevronDownIcon className="size-4" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={animateList}
            initial="init"
            animate="enter"
            exit="exit"
            aria-labelledby="dropdownDefaultButton"
            className="absolute w-full z-20 bg-white pb-0 rounded-md mt-1 overflow-hidden shadow"
            onMouseLeave={() => setIsOpen(false)}
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="w-full px-2 py-2 md:px-4 font-semibold hover:bg-success cursor-pointer"
                onClick={() => {
                  setActiveIndex(index);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
