"use client";

import { TAsset } from "@/app/api/_cms/collections/files";
import { useEffect, useRef, useState } from "react";

type Props = {
  asset: TAsset;
  preset?: string;
  className?: string;
};

export default function ImageAsset({ asset, preset = "", className }: Props) {
  const ref = useRef<HTMLImageElement>(null);

  const { id, title, filename_download: filename } = asset;

  const composedSrc = `/media/${id}/${filename}${(preset &&=
    "?key=" + preset)}`;

  useEffect(() => {
    let img = ref.current;

    if (!img) return;

    function onLoadHandler() {
      img?.classList.remove("opacity-0");
    }

    function onErrorHandler() {
      console.error("IMG", "ERROR", composedSrc);
    }

    img.addEventListener("load", onLoadHandler);
    img.addEventListener("error", onErrorHandler);

    if (img.complete) {
      img.naturalHeight ? onLoadHandler() : onErrorHandler();
    }

    return () => {
      if (!img) return;

      img.removeEventListener("load", onLoadHandler);
      img.removeEventListener("error", onErrorHandler);
    };
  }, []);

  return (
    <img
      ref={ref}
      loading="lazy"
      src={composedSrc}
      alt={title}
      className={`${className} opacity-0 transition-opacity duration-500`}
    />
  );
}
