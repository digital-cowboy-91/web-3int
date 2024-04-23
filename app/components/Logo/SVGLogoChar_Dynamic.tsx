"use client";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import SVGLogoChar from "./SVGLogoChar";

export default function SVGLogoChar_Dynamic() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!scope.current) return;

    const init = () =>
      animate(
        "path",
        {
          pathLength: [0, 1],
        },
        {
          duration: 3,
        }
      );

    const reverse = () =>
      animate(
        "path",
        {
          pathLength: 0,
        },
        {
          duration: 3,
        }
      );

    scope.current?.addEventListener("mouseenter", reverse().play());
    scope.current?.addEventListener("mouseleave", reverse().pause());

    init().play();

    return () => {
      scope.current?.removeEventListener("mouseenter", reverse().play());
      scope.current?.removeEventListener("mouseleave", reverse().pause());
    };
  }, []);

  if (!scope) return null;

  return <SVGLogoChar scope={scope} />;
}
