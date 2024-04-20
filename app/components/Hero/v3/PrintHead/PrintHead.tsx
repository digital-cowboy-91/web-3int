"use client";

import useAnimation from "./PrintHead.hook";
import { FilamentLine } from "./FilamentLine";

export default function PrintHead({ className }: { className?: string }) {
  const { scope } = useAnimation();

  return (
    <div
      id="printHeadContainer"
      ref={scope}
      className={`relative flex items-center justify-center ${className}`}
    >
      <div id="printHead" className="w-[250px] drop-shadow">
        <img src="/print_head.svg" alt="" />
        <img
          id="fan"
          src="/fan.svg"
          alt=""
          className="absolute inset-0 size-[116px] left-1/2 top-[270px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <FilamentLine parentDOMRect={scope.current?.getBoundingClientRect()} />
    </div>
  );
}
