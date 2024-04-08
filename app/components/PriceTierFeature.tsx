"use client";
import { InformationCircleIcon as InfoIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon as InfoIconSolid } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  feature: string;
  description?: string | null;
};

const animSpan = {
  init: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const animIcon = {
  init: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const PriceTierFeature = ({ feature, description }: Props) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex flex-row justify-between items-start">
      <AnimatePresence mode="wait">
        {showInfo ? (
          <motion.span
            key="true"
            variants={animSpan}
            initial="init"
            animate="enter"
            exit="exit"
            className="font-bold text-primary"
          >
            {description}
          </motion.span>
        ) : (
          <motion.span
            key="false"
            variants={animSpan}
            initial="init"
            animate="enter"
            exit="exit"
            className=""
          >
            {feature}
          </motion.span>
        )}
      </AnimatePresence>
      {description && (
        <button
          onClick={() => setShowInfo(!showInfo)}
          aria-label="additional information"
        >
          <AnimatePresence mode="popLayout">
            {showInfo ? (
              <motion.div
                key="true"
                variants={animIcon}
                initial="init"
                animate="enter"
                exit="exit"
                className="text-primary"
              >
                <InfoIconSolid width="1.2rem" />
              </motion.div>
            ) : (
              <motion.div
                key="false"
                variants={animIcon}
                initial="init"
                animate="enter"
                exit="exit"
                className=""
              >
                <InfoIcon key="false" width="1.2rem" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      )}
    </div>
  );
};

export default PriceTierFeature;
