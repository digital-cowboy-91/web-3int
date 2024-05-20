"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";

type TProps = {
  id: string;
  question: string;
};

export default function FAQQuestionButton({ id, question }: TProps) {
  return (
    <button
      className="faq__item__question"
      onClick={() => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute(
          "data-state",
          el.getAttribute("data-state") === "open" ? "closed" : "open"
        );
      }}
    >
      {question}
      <ChevronDownIcon className="size-6" />
    </button>
  );
}
