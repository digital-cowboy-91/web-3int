"use client";

import { TGallery } from "@/app/api/_cms/items/gallery";
import ImageAsset from "@/app/components/ImageAsset";
import IconAnimation from "@/app/components/icons/IconAnimation";
import IconTimelapse from "@/app/components/icons/IconTimelapse";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import BuyingOptions from "./BuyingOptions";

const GalleryDetail = ({
  model,
  modalMode = false,
}: {
  model: TGallery;
  modalMode?: boolean;
}) => {
  const {
    id,
    title,
    media,
    attributes,
    claim_ownership,
    work_name,
    work_url,
    author_name,
    author_url,
    license_name,
    license_url,
    buying_options,
  } = model;

  const [activeMedia, setActiveMedia] = useState(media[0]?.asset || undefined);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-5 gap-8 ${
        modalMode && "bg-gray-light md:rounded-md p-4 md:p-8"
      }`}
    >
      <div className="md:order-2 md:col-span-2 flex flex-col gap-8">
        <h1 className={` ${modalMode && "mt-5 md:mt-0 me-10"}`}>{title}</h1>
        <div className="text-left grid grid-cols-2 gap-2 mb-auto">
          {attributes?.map((attr, index) => {
            return (
              <Fragment key={index}>
                <div className="font-semibold">{attr.name}</div>
                <div className="text-right">{attr.value}</div>
              </Fragment>
            );
          })}
        </div>
        {buying_options?.length > 0 && (
          <BuyingOptions products={buying_options} />
        )}
        <div className="md:order-4 text-xs md:col-span-5">
          <Link
            href={claim_ownership ? "/gallery/" + id : (work_url as string)}
          >
            {claim_ownership ? title : work_name}
          </Link>{" "}
          by{" "}
          <Link href={claim_ownership ? "/" : (author_url as string)}>
            {claim_ownership ? "3INT UK" : author_name}
          </Link>
          {license_name && license_url && (
            <>
              <br />
              is licensed under{" "}
              <Link href={license_url as string}>{license_name}</Link>
            </>
          )}
        </div>
      </div>
      <div className="md:order-4 md:col-span-3 flex flex-wrap justify-center gap-2">
        {media?.map(({ asset: item }) => {
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className={`flex-none relative w-[4rem] h-[4rem] bg-white rounded-md p-1`}
              aria-label={`Show image ${item.title}`}
            >
              {activeMedia.id === item.id && (
                <motion.div
                  className="absolute z-10 inset-0 border-2 border-primary rounded-md"
                  layoutId="underline"
                />
              )}
              {item.type.includes("video") && item.tags != null ? (
                item.tags.includes("timelapse") ? (
                  <IconTimelapse fill="#000" stroke="#000" />
                ) : (
                  <IconAnimation fill="#000" stroke="#000" />
                )
              ) : (
                <ImageAsset
                  asset={item}
                  preset="h100"
                  className="object-contain w-full h-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      <div
        className={`md:order-1 h-[300px] md:h-[500px] md:col-span-3 md:p-8 flex flex-col gap-8 rounded-md ${
          activeMedia?.type.includes("video") ? "bg-dark" : "bg-white"
        }`}
      >
        {activeMedia?.type.includes("video") ? (
          <ReactPlayer
            playing
            loop
            url={`${process.env.CMS_HOST}/assets/${activeMedia?.id}/${activeMedia?.filename_download}`}
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
            type={activeMedia?.type}
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
                key={activeMedia.id}
                asset={activeMedia}
                preset="h1280"
                className="object-contain h-full w-full"
              />
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
