"use client";

import { PropsWithChildren, createContext, useState } from "react";

type TGSM = {
  showModal: Boolean;
  setShowModal: (show: Boolean) => void;
};

export const GSMContext = createContext<TGSM>({
  showModal: false,
  setShowModal: () => null,
});

export default function GSMProvider({ children }: PropsWithChildren) {
  const [showModal, setShowModal] = useState<Boolean>(false);

  return (
    <GSMContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </GSMContext.Provider>
  );
}
