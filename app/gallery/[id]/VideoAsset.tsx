"use client";

import { TAsset } from "@/app/api/_cms/collections/files";
import ReactPlayer from "react-player";

type TProps = {
  item: TAsset;
  width?: number | string;
  height?: number | string;
};

export default function VideoAsset({ item, width, height }: TProps) {
  return (
    <ReactPlayer
      url={`/media/${item.id}/${item.filename_download}`}
      width={width}
      height={height}
      controls={true}
      fallback={<div>Loading... </div>}
      config={{
        file: {
          attributes: {
            controlsList: "nodownload",
            disablePictureInPicture: true,
          },
        },
      }}
      type={item.type}
    />
  );
}
