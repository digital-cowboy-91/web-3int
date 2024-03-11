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
    <div id={id} className={"relative " + className}>
      <button
        className={`px-4 gap-4 w-full font-semibold ${
          isOpen
            ? "border-primary border-b-2 pt-[8px] pb-[7px] "
            : "border-grey hover:border-primary border-b-[1px] hover:border-b-2 py-[8px] hover:pt-[8px] hover:pb-[7px]"
        } inline-flex justify-between items-center text-nowrap overflow-hidden peer group`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseLeave={handleMouseLeave}
      >
        <span className="truncate">
          {options.find((o) => o.value === selected)?.option}
        </span>
        <ChevronDownIcon
          className={`size-4 ${
            isOpen
              ? "text-primary"
              : "text-dark group-hover:text-primary rotate-90"
          } transition-transform`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={animateList}
            initial="init"
            animate="enter"
            exit="exit"
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
        <span
          className={`absolute -left-2 -top-2 ${
            isOpen
              ? "text-primary"
              : "text-dark peer-hover:text-primary bg-grey-light"
          } px-2 text-2xs`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
