"use client";

import Image from "@/app/components/Image";
import { TModel } from "@/prisma/modelModel";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import GalleryDetailLink from "./GalleryDetailLink";

const GalleryDetail = ({ model }: { model: TModel }) => {
  const {
    id,
    title,
    media,
    dimensions: d,
    thickness,
    filament,
    layerHeight,
    support,
    printTime,
    coverImageId,
  } = model;

  const [activeMedia, setActiveMedia] = useState(
    media.find((i) => i.id === coverImageId)
  );

  return (
    <div className="flex flex-col md:flex-row md:w-full">
      <div className="relative bg-white order-2 md:order-1 md:w-3/5 h-[500px] md:h-auto">
        <div className="absolute inset-0 flex items-center justify-center m-4 md:m-8">
          {activeMedia.type === "video" ? (
            <ReactPlayer playing url={activeMedia.url} controls={true} />
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
                <Image
                  key={activeMedia.id}
                  src={activeMedia.url}
                  className="object-contain max-h-full max-w-full"
                  alt=""
                  sizes="1200px"
                  fill
                  quality={90}
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
              <tr>
                <th>Dimensions</th>
                <td className="text-right px-0">
                  {d[0]}x{d[1]}x{d[2]} mm
                </td>
              </tr>
              {thickness && (
                <tr>
                  <th>Thickness</th>
                  <td className="text-right px-0">{thickness} mm</td>
                </tr>
              )}
              <tr>
                <th>Filament</th>
                <td className="text-right px-0">{filament} g</td>
              </tr>
              {layerHeight && (
                <tr>
                  <th>Layer height</th>
                  <td className="text-right px-0">{layerHeight}</td>
                </tr>
              )}
              <tr>
                <th>Support</th>
                <td className="text-right px-0">{support ? "yes" : "no"}</td>
              </tr>
              <tr>
                <th>Print time</th>
                <td className="text-right px-0">{printTime} min</td>
              </tr>
            </tbody>
          </table>
          <div className="my-auto flex flex-row gap-8 justify-end">
            {/* <button className={CSSButtonLink}>STL</button> */}
            <GalleryDetailLink id={id} />
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center h-[100px] p-4 bg-primary overflow">
          {media.map((item) => {
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className={`relative w-[100px]`}
                aria-label={`Show image ${item.title}`}
              >
                <Image
                  src={item.type === "video" ? item.thumbnail.url : item.url}
                  alt=""
                  sizes="100px"
                  style={{ objectFit: "contain" }}
                  fill
                  className="hover:scale-[1.2] active:scale-[1] duration-300"
                  loaderColor="#fff"
                />
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
