"use client";

import { useEffect, useState } from "react";
import useAnimation from "./Background.hook";
import Circles from "./Circles";
import { FilamentLine } from "./FilamentLine";
import SketchLines from "./SketchLines";

export default function Background({ className }: { className?: string }) {
  const { scope } = useAnimation();

  return (
    <>
      <div ref={scope} className="absolute inset-0 -z-10 size-full">
        <div className="h-full w-[250px] absolute inset-x-1 left-3/4 top-1/2 -translate-x-1/2 -translate-y-[300px] z-10 drop-shadow">
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
        <FilamentLine className="absolute top-1/2 -z-10" />
        <Circles className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
        <SketchLines className="absolute left-1/2 -translate-x-1/2 inset-y-0" />

        <svg className="absolute w-full h-1/2 -z-20">
          <defs>
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="5"
                numOctaves="1"
                stitchTiles="stitch"
                result="turbulence"
              />
              <feComposite
                in="SourceGraphic"
                in2="turbulence"
                operator="in"
                result="composite1"
                id="feComposite42"
              />
              <feColorMatrix
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 -1 "
                result="color"
                id="feColorMatrix42"
              />
              <feFlood
                floodOpacity="1"
                floodColor="rgb(0,144,85)"
                result="flood"
                id="feFlood42"
              />
              <feMerge result="merge" id="feMerge43">
                <feMergeNode in="flood" id="feMergeNode42" />
                <feMergeNode in="color" id="feMergeNode43" />
              </feMerge>
              <feComposite
                in2="SourceGraphic"
                operator="in"
                result="composite2"
                id="feComposite43"
              />
            </filter>

            <radialGradient
              id="grad"
              cx="75%"
              cy="100%"
              r="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00A561" stopOpacity="0" />
              {/* <stop offset="20%" stopColor="#00F48F" stopOpacity=".2" /> */}
              <stop offset="33%" stopColor="#00F48F" stopOpacity=".5" />
              <stop offset="66%" stopColor="#00F48F" stopOpacity=".75" />
              <stop offset="100%" stopColor="#00F48F" />
            </radialGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#00A561"
            filter="url(#noiseFilter)"
          />
          <rect width="100%" height="100%" fill="url(#grad)" />
        </svg>
      </div>
    </>
  );
}
