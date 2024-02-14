import { useState } from "react";
import { CSSButtonOutline } from "../styles";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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
        className={`${CSSButtonOutline} bg-action text-dark flex items-center gap-2`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options[activeIndex]} <ChevronDownIcon className="w-[1rem] h-[1rem]" />
      </button>
      {isOpen && (
        <ul
          aria-labelledby="dropdownDefaultButton"
          className="absolute bg-white pb-0 w-full rounded-md mt-1 overflow-hidden shadow"
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="w-full px-2 py-2 md:px-4 font-semibold hover:bg-action cursor-pointer"
              onClick={() => {
                setActiveIndex(index);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
