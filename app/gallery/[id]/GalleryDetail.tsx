"use client";

import { CSSLinkOutline } from "@/app/styles";
import { TGallery } from "@/cms/items/gallery";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import IconTimelapse from "@/app/components/icons/IconTimelapse";
import IconAnimation from "@/app/components/icons/IconAnimation";

const GalleryDetail = ({
  model,
  modalMode = false,
}: {
  model: TGallery;
  modalMode?: boolean;
}) => {
  const { title, media, attributes } = model;

  const [activeMedia, setActiveMedia] = useState(media[0]?.asset || undefined);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-5 min-h-[500px] gap-8 ${
        modalMode && "bg-gray-light"
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
        className={`md:order-3 md:col-start-4 md:col-span-2 text-left grid grid-cols-2 gap-2 ${
          modalMode && "mx-8 md:ms-0"
        }`}
      >
        {attributes?.map((attr, index) => {
          return (
            <Fragment key={index}>
              <div className="font-bold">{attr.name}</div>
              <div className="text-right px-0">{attr.value}</div>
            </Fragment>
          );
        })}
      </div>
      <div
        className={`md:order-5 md:col-start-4 md:col-span-2 flex items-center ${
          modalMode && "md:mb-8 mx-8 md:ms-0"
        }`}
      >
        {/* <button className={CSSButtonLink}>STL</button> */}
        <Link
          href={`/?subject=About: ${title}#contact`}
          className={`${CSSLinkOutline} ms-auto`}
        >
          Ask About
        </Link>
      </div>
      <div
        className={`md:order-1 md:col-start-1 md:col-span-3 md:row-span-4 md:p-8
        ${!modalMode && "rounded-md"}
        ${activeMedia?.type.includes("video") ? "bg-dark" : "bg-white"}
        `}
      >
        <div className="flex items-center justify-center h-full">
          {activeMedia?.type.includes("video") ? (
            <ReactPlayer
              playing
              loop
              url={`https://cms.3int.uk/assets/${activeMedia?.id}`}
              controls={true}
              fallback={<div>Loading... </div>}
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
                <img
                  src={`https://cms.3int.uk/assets/${activeMedia?.id}?key=1920`}
                  alt={activeMedia?.title}
                  className="object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </div>
      </div>
      <div
        className={`md:order-4 md:col-start-4 md:col-span-2 flex flex-wrap justify-between gap-2 ${
          modalMode && "md:mb-0 mb-8 mx-8 md:ms-0"
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
                  className="absolute inset-0 border-2 border-primary rounded-md"
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
                <img
                  className="object-contain w-full h-full"
                  src={`https://cms.3int.uk/assets/${item.id}?key=100`}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryDetail;
