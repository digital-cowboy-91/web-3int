"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const buttonClass = "flex-none enabled:text-primary disabled:text-gray-200";

type TProps = {
  value: number;
  disableDecrease?: boolean;
  disableIncrease?: boolean;
  handleChange: (value: number) => void;
  className?: string;
};

export default function QuantitySelector({
  value,
  disableDecrease = false,
  disableIncrease = false,
  handleChange,
  className = "",
}: TProps) {
  return (
    <div className={`inline-flex items-center w-[80px] ${className}`}>
      <button
        className={buttonClass}
        onClick={() => handleChange(value - 1)}
        disabled={value === 0 || disableDecrease}
      >
        <MinusCircleIcon className="size-6" />
      </button>
      <span className="grow text-center">{value}</span>
      <button
        className={buttonClass}
        onClick={() => handleChange(value + 1)}
        disabled={disableIncrease}
      >
        <PlusCircleIcon className="size-6" />
      </button>
    </div>
  );
}
