"use client";

import { type ElementRef, useEffect, useRef, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Modal({ children }: PropsWithChildren) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = "15px";
    }
  }, []);

  function onDismiss() {
    router.back();
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="bg-transparent w-screen text-left shadow-xl transition-all w-full max-w-screen-lg sm:rounded-lg"
      onClose={onDismiss}
    >
      <button
        className="absolute end-0 m-8 me-4 md:me-8 border-2 rounded-full border-transparent hover:border-current"
        onClick={onDismiss}
        aria-label="Close modal window"
      >
        <XMarkIcon height="2rem" />
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root")!
  );
}
