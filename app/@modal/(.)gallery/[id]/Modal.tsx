"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const animateBackdrop = {
  init: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const animateDialog = {
  init: { opacity: 0, y: -50 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Modal({ children }: PropsWithChildren) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!showModal) {
      setShowModal(true);
      document.documentElement.classList.add("modal-lockdown");
    }
  }, []);

  function onClose() {
    setShowModal(false);
    setTimeout(() => {
      router.back();
      document.documentElement.classList.remove("modal-lockdown");
    }, 300);
  }

  return (
    <AnimatePresence>
      {showModal && (
        <div className="absolute z-20 flex items-center justify-center">
          <motion.div
            key="backdrop"
            variants={animateBackdrop}
            initial="init"
            animate="enter"
            exit="exit"
            className="fixed inset-0 bg-dark bg-opacity-75"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-aut scroll-bar-compensation">
            <motion.div
              key="dialog"
              variants={animateDialog}
              initial="init"
              animate="enter"
              exit="exit"
              className="flex min-h-full items-center justify-center text-center sm:items-center md:p-4"
            >
              <div className="relative transform overflow-hidden text-left shadow-xl transition-all w-full max-w-screen-lg sm:rounded-lg">
                <button
                  className="absolute end-0 m-8 me-4 md:me-8 border-2 rounded-full border-transparent hover:border-current"
                  onClick={onClose}
                  aria-label="Close modal window"
                >
                  <XMarkIcon height="2rem" />
                </button>
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
