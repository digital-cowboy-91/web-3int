"use client";

import { TAsset } from "@/app/api/_cms/collections/files";
import ImageAsset from "@/app/components/ImageAsset";
import { useSearchParams } from "next/navigation";
import ReactPlayer from "react-player";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function Media({ assets }: { assets: TAsset[] }) {
  const assetParam = useSearchParams().get("asset");
  const assetActive = assets.find((i) => i.id === assetParam) || assets[0];

  return assetActive.type.includes("video") ? (
    <ReactPlayer
      playing
      loop
      url={`/media/${assetActive?.id}/${assetActive?.filename_download}`}
      controls={true}
      fallback={<div>Loading... </div>}
      width="100%"
      height="100%"
      config={{
        file: {
          attributes: {
            controlsList: "nodownload",
            disablePictureInPicture: true,
          },
        },
      }}
      type={assetActive?.type}
      data-type="video"
    />
  ) : (
    <TransformWrapper initialScale={1} centerOnInit={true}>
      <TransformComponent
        wrapperStyle={{
          height: "100%",
          width: "100%",
        }}
        contentStyle={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <ImageAsset
          key={assetActive.id}
          asset={assetActive}
          preset="h1280"
          className="object-contain size-full"
        />
      </TransformComponent>
    </TransformWrapper>
  );
}
