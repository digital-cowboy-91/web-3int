"use client";

import { CSSButtonLink } from "@/app/styles";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageAsset from "../ImageAsset";
import { TGallery } from "@/app/api/_cms/collections/gallery";

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

const ModelList = ({ data }: { data: TGallery[] }) => {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(4);

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
                <motion.div
                  variants={animateCard}
                  initial="init"
                  whileHover="hover"
                  whileFocus="focus"
                  className="bg-white rounded-[1rem] cursor-pointer h-[250px] w-full overflow-hidden"
                  aria-label={`Details of ${item.title} model`}
                >
                  <Link href={`/gallery/${item.id}`} scroll={false}>
                    <div className="h-2/3 w-full flex items-center">
                      <ImageAsset
                        asset={item.cover_image}
                        preset="h250"
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="h-1/3 w-full font-bold flex justify-center text-center p-4">
                      {item.title}
                    </div>
                  </Link>
                </motion.div>
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
