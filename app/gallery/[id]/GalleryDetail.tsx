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
      className={`grid grid-cols-1 md:grid-cols-5 min-h-[500px] gap-8 ${
        modalMode && "bg-gray-light md:rounded-md"
      }`}
    >
      <h2
        className={`md:order-2 md:col-start-4 md:col-span-2 ${
          modalMode && "mt-8 ms-8 me-20 md:ms-0"
        }`}
      >
        {title}
      </h2>
      <div
        className={`md:order-1 md:col-start-1 md:col-span-3 md:row-span-5 md:p-8 flex items-center
        ${activeMedia?.type.includes("video") ? "bg-dark" : "bg-white"}
        ${modalMode ? "md:rounded-s-md" : "rounded-md"}
        `}
      >
        <div className="aspect-square">
          {activeMedia?.type.includes("video") ? (
            <ReactPlayer
              playing
              loop
              url={`https://cms.3int.uk/assets/${activeMedia?.id}/${activeMedia?.filename_download}`}
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
      <div
        className={`md:order-4 md:col-start-4 md:col-span-2 flex flex-wrap justify-center gap-2 ${
          modalMode && "mx-8 md:ms-0"
        }`}
      >
        {media?.map(({ asset: item }) => {
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className={`relative w-[4rem] h-[4rem] bg-white rounded-md p-1`}
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
        className={`md:order-3 md:col-start-4 md:col-span-2 text-left grid grid-cols-2 gap-2 ${
          modalMode && "mx-8 md:ms-0"
        }`}
      >
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
        <div
          className={`md:order-5 md:col-start-4 md:col-span-2 ${
            modalMode && "mx-8 md:ms-0"
          }`}
        >
          <BuyingOptions products={buying_options} />

          {/* <Link
          href={`/?subject=About: ${title}#contact`}
          className={`${CSSLinkOutline} ms-auto`}
        >
          Ask About
        </Link> */}
        </div>
      )}
      <div
        className={`md:order-6 md:col-start-4 md:col-span-2 text-xs ${
          modalMode && "mb-8 mx-8 md:ms-0"
        }`}
      >
        <Link href={claim_ownership ? "/gallery/" + id : (work_url as string)}>
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
  );
};

export default GalleryDetail;
