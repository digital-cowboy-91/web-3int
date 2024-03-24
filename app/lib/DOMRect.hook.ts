import { useEffect, useState } from "react";

export default function useDOMRect(selector: string) {
  const [state, setState] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!window) return;

    const resizeHandler = () => {
      const element = document.querySelector(selector) as HTMLElement;

      if (!element) {
        throw new Error("Element not found for selector: " + selector);
      }

      setState(element.getBoundingClientRect());
    };

    window.addEventListener("resize", resizeHandler);

    resizeHandler();

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return state;
}
