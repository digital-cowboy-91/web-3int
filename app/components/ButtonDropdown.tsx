import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
        className="btn-outline-success"
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
            aria-optionledby="dropdownDefaultButton"
            className="absolute w-full z-20 bg-white pb-0 rounded-md mt-1 overflow-hidden shadow"
            onMouseLeave={() => setIsOpen(false)}
          >
            {options.map((option, index) => (
              <li
                key={index}
                className={`btn--outline--success--link w-full p-2 md:px-4 font-semibold cursor-pointer`}
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

type TProps = {
  id: string;
  label?: string;
  options: {
    option: string;
    value: string;
  }[];
  defaultSelected?: string;
  onSelect: (value: string) => void;
  className?: string;
};

let timeoutRef: NodeJS.Timeout;

export function ButtonDropdown_v2({
  id,
  label,
  options,
  defaultSelected,
  onSelect,
  className,
}: TProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected || options[0].value);

  function handleMouseEnter() {
    clearTimeout(timeoutRef);
  }

  function handleMouseLeave() {
    timeoutRef = setTimeout(() => setIsOpen(false), 100);
  }

  return (
    <div className={"relative " + className}>
      <button
        className={`font-semibold px-4 py-2 gap-4 w-full bg-transparent rounded-full border-2 ${
          isOpen ? "border-primary" : "border-green-600"
        } inline-flex justify-between items-center text-nowrap overflow-hidden`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseLeave={handleMouseLeave}
      >
        {options.find((o) => o.value === selected)?.option}
        <ChevronDownIcon
          className={`size-4 ${isOpen ? "" : "rotate-90"} transition-transform`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={animateList}
            initial="init"
            animate="enter"
            exit="exit"
            aria-optionledby="dropdownDefaultButton"
            className="absolute w-full z-10 bg-white pb-0 rounded-md mt-1 overflow-hidden shadow"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {options.map(({ option, value }) => (
              <li
                key={value}
                className="w-full p-2 md:px-4 cursor-pointer hover:bg-primary hover:text-white"
                onClick={() => {
                  setSelected(value);
                  setIsOpen(false);
                  onSelect(value);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {label && (
        <label
          htmlFor={id}
          className={`absolute left-4 -top-1 bg-white ${
            isOpen ? "text-primary" : "text-green-600"
          } px-2 text-2xs`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
