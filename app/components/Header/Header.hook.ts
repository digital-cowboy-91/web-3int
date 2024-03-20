import { stagger, useAnimate, useCycle } from "framer-motion";
import { useEffect } from "react";

export default function useAnimation() {
  const [isOpen, toggleMenu] = useCycle(false, true);
  const [scope, animate] = useAnimate();

  const clipHeight = () => {
    if (!scope?.current) return 0;

    const w = scope.current.offsetWidth;
    const h = scope.current.offsetHeight;

    return (w > h ? w : h) * Math.sqrt(2);
  };

  const open = async () => {
    await animate(
      ".wrapper",
      {
        height: "100vh",
      },
      {
        duration: 0,
      }
    );

    await animate(".background", {
      clipPath: `circle(${clipHeight()}px at 40px 40px)`,
    });

    animate(
      ".menu-items",
      {
        height: "auto",
      },
      { duration: 0 }
    );

    animate(
      "li",
      {
        opacity: [0, 1],
        x: [50, 0],
      },
      {
        delay: stagger(0.1),
      }
    );
  };

  const close = async () => {
    animate(
      ".menu-items",
      {
        height: 0,
      },
      { duration: 0 }
    );
    await animate(".background", {
      clipPath: "circle(1.75rem at 2.75rem 2.75rem)",
    });
    await animate(
      ".wrapper",
      {
        height: "auto",
      },
      {
        duration: 0,
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      close();
    }
  }, [isOpen]);

  return { scope, toggleMenu };
}
