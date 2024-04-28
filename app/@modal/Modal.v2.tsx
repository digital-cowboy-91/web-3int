"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren, useEffect, useState } from "react";
import Action from "../components/Actions/Action";
import "./Modal.v2.style.css";
import { useRouter } from "next/navigation";

export default function Modal({ children }: PropsWithChildren) {
  const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const handleClose = () => {
    setIsHidden(true);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  useEffect(() => {
    setIsHidden(false);
  }, []);

  return (
    <div className="modal" onClick={handleClose} data-modal-hidden={isHidden}>
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal__dialog-header">
          <Action
            as="button"
            active="icon"
            icon={<XMarkIcon />}
            variant="outlined"
            onClick={handleClose}
          />
        </div>
        <div className="modal__dialog-content">{children}</div>
      </div>
    </div>
  );
}
