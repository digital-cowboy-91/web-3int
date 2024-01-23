"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";
import { PuffLoader } from "react-spinners";

export default function Image({
  wrapperClassName = "",
  loaderSize = 30,
  loaderColor = "#808080",
  ...props
}: {
  wrapperClassName?: string;
  loaderSize?: number;
  loaderColor?: string;
} & Omit<ImageProps, "onLoad">) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`h-full w-full ${wrapperClassName}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="Skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute h-full w-full flex items-center justify-center"
          >
            <PuffLoader size={loaderSize} color={loaderColor} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full"
      >
        <NextImage
          {...props}
          onLoad={(e) => {
            setIsLoaded(true);
          }}
        />
      </motion.div>
    </div>
  );
}
