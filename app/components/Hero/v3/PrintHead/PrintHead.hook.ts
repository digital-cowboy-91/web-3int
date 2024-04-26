import { stagger, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function useAnimation() {
  const [state, setState] = useState<"playing" | undefined>(undefined);
  const [scope, animate] = useAnimate();

  const enter = async () => {
    await animate(
      "#printHead",
      {
        opacity: [0, 1],
        rotateZ: [12, 0],
        scale: [0.5, 1],
      },
      {
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 500,
        },
        rotateZ: {
          type: "spring",
          damping: 10,
          stiffness: 300,
        },
      }
    );
  };

  const spinFan = () =>
    animate(
      "#printHeadFan",
      {
        left: ["50%"],
        top: ["270px"],
        x: ["-50%"],
        y: ["-50%"],
        rotateZ: [0, 360],
      },
      {
        rotateZ: {
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        },
      }
    );

  const filamentLines = () => {
    animate("#filamentLines", {
      opacity: 1,
    });

    const time = 5;
    const delay = time * 0.75;

    return animate(
      ".filamentLine",
      {
        pathLength: [0, 1, 0],
        pathOffset: [0, 0, 1],
      },
      {
        duration: time,
        ease: "linear",
        repeat: Infinity,
        delay: stagger(delay),
        repeatDelay: delay * 2 - time,
      }
    );
  };

  const headFloat = () =>
    animate(
      "#printHead",
      {
        y: [-5, 5],
      },
      {
        duration: 1,
        repeatType: "reverse",
        repeat: Infinity,
        ease: "easeInOut",
      }
    );

  const play = async () => {
    setState("playing");

    await enter();
    spinFan();
    filamentLines();
    headFloat();
  };

  useEffect(() => {
    play();
  }, []);

  return {
    scope,
    state,
  };
}
