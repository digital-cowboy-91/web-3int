"use client";

import useAnimation from "./PrintHead.hook";
import { FilamentLine } from "./FilamentLine";

export default function PrintHead({ className }: { className?: string }) {
  const { scope } = useAnimation();

  return (
    <div ref={scope} className="flex items-center justify-center">
      <div id="printHead" className="relative w-[250px] z-10 drop-shadow">
        <img src="/print_head.svg" alt="" />
        <img
          id="fan"
          src="/fan.svg"
          alt=""
          className="absolute inset-0 size-[116px] left-1/2 top-[270px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <FilamentLine className="absolute bottom-0 inset-x-0 -z-10" />
    </div>
  );
}
