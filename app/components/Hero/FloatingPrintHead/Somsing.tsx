"use client";

import useAnimation from "./Background.hook";
import { FilamentLine } from "./FilamentLine";

export default function Background({ className }: { className?: string }) {
  const { scope } = useAnimation();

  return (
    <div ref={scope} className="flex items-center justify-center">
      <div className="w-[250px] z-10 drop-shadow">
        <div id="printHead" className="relative size-full">
          <img src="/print_head.svg" alt="" />
          <img
            id="fan"
            src="/fan.svg"
            alt=""
            className="absolute inset-0 size-[116px] left-1/2 top-[270px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      {/* <FilamentLine className="absolute top-1/2 -z-10" /> */}
    </div>
  );
}
