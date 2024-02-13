"use client";

import { useState } from "react";

const base = "https://cms.3int.uk/assets";

type Props = {
  id: string;
  alt?: string;
  preset?: string;
  className?: string;
};

export default function Image({ id, alt = "", preset = "", className }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={`${base}/${id}?key=${preset}`}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.5s",
      }}
    />
  );
}
