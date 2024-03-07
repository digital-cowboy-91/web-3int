"use client";

import { TFAQ } from "@/app/api/_cms/collections/faq";
import { CSSButtonLink } from "@/app/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const changeHeight = (id: string, prev: number) => {
  const curr = document.querySelector("#" + id);
  return curr?.clientHeight || prev;
};

const QueryList = ({ data }: { data: TFAQ[] }) => {
  const [[page, isNext, prevHeight], setPageProps] = useState([0, true, 226]);

  const offset = 3;
  const id = "faq_" + page;

  const variantsBlock = {
    init: {
      opacity: 0,
      height: prevHeight,
    },
    enter: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const variantsItem = {
    init: { opacity: 0, x: isNext ? 200 : -200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isNext ? -200 : 200 },
  };

  return (
    <div className="px-8 pb-8">
      <AnimatePresence mode="popLayout">
        <motion.ul
          key={page}
          id={id}
          variants={variantsBlock}
          initial="init"
          animate="enter"
          exit="exit"
          className="text-center flex flex-col gap-4 mb-4 overflow-hidden ms-0"
        >
          {data
            .slice(page * offset, page * offset + offset)
            .map(({ id, question, answer }: TFAQ) => (
              <motion.li key={id} variants={variantsItem}>
                <h3 className={`text-primary mb-0`}>{question}</h3>
                <p className="ms-0">{answer}</p>
              </motion.li>
            ))}
        </motion.ul>
      </AnimatePresence>
      <div className="flex flex-row justify-center items-center gap-8">
        <button
          className={CSSButtonLink}
          onClick={() =>
            setPageProps([page - 1, false, changeHeight(id, prevHeight)])
          }
          disabled={page === 0}
          aria-label={`Show previous ${offset} FAQ`}
        >
          Prev
        </button>

        <div className="font-semibold text-grey border-b-2 border-transparent">
          {page + 1}/{Math.ceil(data.length / offset)}
        </div>
        <button
          className={CSSButtonLink}
          onClick={() =>
            setPageProps([page + 1, true, changeHeight(id, prevHeight)])
          }
          disabled={page >= data.length / offset - 1}
          aria-label={`Show next ${offset} FAQ`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QueryList;
