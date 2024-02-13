"use client";

import { TAsset } from "@/cms/items/gallery";
import { useEffect, useRef, useState } from "react";

const base = "https://cms.3int.uk";

type Props = {
  asset: TAsset;
  preset?: string;
  className?: string;
};

export default function ImageAsset({ asset, preset = "", className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { id, title, filename_download: filename } = asset;

  const composedSrc = `${base}/assets/${id}/${filename}${(preset &&=
    "?key=" + preset)}`;

  useEffect(() => {
    let img = ref.current;

    if (!img) return;

    function onLoadHandler() {
      setIsLoaded(true);
    }

    function onErrorHandler() {
      console.log("IMG", "ERROR", composedSrc);
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
      className={className}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.5s",
      }}
    />
  );
}
