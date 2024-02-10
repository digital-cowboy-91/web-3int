"use client";

import { CSSLinkOutline } from "@/app/styles";
import { TGallery } from "@/cms/items/gallery";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ReactPlayer from "react-player";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const GalleryDetail = ({ model }: { model: TGallery }) => {
  const { title, media, attributes } = model;

  const [activeMedia, setActiveMedia] = useState(media[0].asset);

  return (
    <div className="flex flex-col md:flex-row md:w-full">
      <div className="relative bg-white order-2 md:order-1 md:w-3/5 h-[500px] md:h-auto">
        <div className="absolute inset-0 flex items-center justify-center m-4 md:m-8">
          {activeMedia.type.includes("video") ? (
            <ReactPlayer
              playing
              url={`https://cms.3int.uk/assets/${activeMedia.id}`}
              controls={true}
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
                  src={`https://cms.3int.uk/assets/${activeMedia.id}?key=1920`}
                  alt={activeMedia.title}
                  className="object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </div>
      </div>
      <div className="order-1 md:order-2 md:w-2/5">
        <div className="flex flex-col gap-8 p-4 md:p-8 bg-gray-light">
          <h2 className="me-20">{title}</h2>
          <table className="ms-0">
            <tbody>
              {attributes.map((attr, index) => {
                return (
                  <tr key={index}>
                    <th>{attr.name}</th>
                    <td className="text-right px-0">{attr.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="my-auto flex flex-row gap-8 justify-end">
            {/* <button className={CSSButtonLink}>STL</button> */}
            <Link
              href={`/?subject=About: ${title}#contact`}
              className={CSSLinkOutline}
            >
              Ask About
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center h-[100px] p-4 bg-primary overflow">
          {media.map(({ asset: item }) => {
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className={`relative w-[100px]`}
                aria-label={`Show image ${item.title}`}
              >
                {item.type.includes("video") && item.tags != null ? (
                  item.tags.includes("timelapse") ? (
                    <img
                      src={`https://cms.3int.uk/assets/364bca3d-d4c6-49a8-82bf-4ba53db12f9d?key=100`}
                    />
                  ) : (
                    <img
                      src={`https://cms.3int.uk/assets/8c0f2911-96d4-4480-a36b-9132643e2d07?key=100`}
                    />
                  )
                ) : (
                  <img src={`https://cms.3int.uk/assets/${item.id}?key=100`} />
                )}
                {activeMedia.id === item.id && (
                  <motion.div className="underline" layoutId="underline" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;
