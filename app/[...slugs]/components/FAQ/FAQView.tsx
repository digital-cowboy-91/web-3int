"use client";

import { TFAQ } from "@/app/api/_cms/collections/faq/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import "./FAQ.style.css";

type Props = {
  limit: number;
  items: TFAQ[];
};

export default function FAQView({ limit, items }: Props) {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [boundary, setBoundary] = useState<string | null>("start");

  const handlePrevious = () => {
    setPage(page - 1);
    setBoundary(page - 1 === 1 ? "start" : null);
  };

  const handleNext = () => {
    setPage(page + 1);
    setBoundary(page + 1 === Math.ceil(items.length / limit) ? "end" : null);
  };

  return (
    <div className="c-faq">
      <ul>
        {items
          .slice((page - 1) * limit, page * limit)
          .map(({ id, question, answer }) => (
            <li key={id} data-expanded={expanded === id}>
              <button
                className="header"
                onClick={() =>
                  expanded === id ? setExpanded(null) : setExpanded(id)
                }
              >
                {question}
                <ChevronLeftIcon className="size-4" />
              </button>
              <div className="content-wrapper">
                <div
                  className="content"
                  aria-hidden={expanded !== id}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </div>
            </li>
          ))}
      </ul>
      {items.length <= limit ? null : (
        <div className="pagination">
          <button onClick={handlePrevious} disabled={boundary === "start"}>
            <ChevronLeftIcon className="size-4" />
            Previous
          </button>
          <button onClick={handleNext} disabled={boundary === "end"}>
            Next
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
