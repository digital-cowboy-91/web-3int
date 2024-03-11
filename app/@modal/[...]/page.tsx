"use client";

import { useEffect } from "react";

export default function CatchAll() {
  useEffect(() => {
    document.documentElement.classList.remove("modal-lockdown");
  }, []);

  return null;
}
