"use client";

import { useStoreModal } from "@/app/storeModal";
import { TModel } from "@/prisma/modelModel";
import { AnimatePresence, motion } from "framer-motion";
import Image from "@/app/components/Image";
import { useEffect, useState } from "react";
import GalleryDetail from "../GalleryDetail";
import { CSSButtonLink } from "@/app/styles";

const animateRow = {
  init: {
    opacity: 0,
    height: 0,
  },
  enter: {
    opacity: 1,
    height: "auto",
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};

const animateCol = {
  init: {
    opacity: 0,
    y: -50,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      type: "spring",
      opacity: {
        duration: 1,
      },
    },
  },
};

const animateCard = {
  init: {
    scale: 1,
    zIndex: 0,
    boxShadow: "5px 5px 20px 5px rgba(0, 0, 0, 0)",
  },
  hover: {
    scale: 1.02,
    zIndex: 10,
    boxShadow: "5px 5px 20px 5px rgba(0, 0, 0, 0.3)",
  },
};

const ModelList = ({ data }: { data: TModel[] }) => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(4);

  const setConfig = useStoreModal((s) => s.setConfig);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setOffset(4);
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      setOffset(3);
    } else if (window.matchMedia("(min-width: 640px)").matches) {
      setOffset(2);
    } else {
      setOffset(1);
    }
  }, []);

  return (
    <div className="px-8 pb-8 min-h-[293px]">
      <AnimatePresence mode="sync">
        {[...new Array(page + 1)].map((_item, p) => (
          <motion.div
            key={p}
            id={"model_" + p}
            variants={animateRow}
            initial="init"
            animate="enter"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
          >
            {data.slice(p * offset, p * offset + offset).map((item) => (
              <motion.div key={item.id} variants={animateCol}>
                <motion.button
                  variants={animateCard}
                  initial="init"
                  whileHover="hover"
                  whileFocus="focus"
                  onClick={() => {
                    setConfig({
                      node: <GalleryDetail model={item} />,
                      show: true,
                    });
                  }}
                  className="bg-white flex flex-col rounded-[1rem] overflow-hidden cursor-pointer h-[300px] w-full relative"
                  aria-label={`Details of ${item.title} model`}
                >
                  <div className="relative h-2/3 w-full">
                    <Image
                      src={
                        item.media.find((i) => i.id === item.coverImageId).url
                      }
                      alt=""
                      sizes="400px"
                      style={{ objectFit: "contain" }}
                      fill
                    />
                  </div>
                  <div className="mx-auto font-semibold p-8 pt-4 h-1/3 flex items-center text-center">
                    {item.title}
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex flex-row justify-center gap-8">
        {!(page >= data.length / offset - 1) && (
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= data.length / offset - 1}
            className={CSSButtonLink}
            aria-label="Show more models"
          >
            More
          </button>
        )}
      </div>
    </div>
  );
};

export default ModelList;
