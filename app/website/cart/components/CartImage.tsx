"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

const stripes = [-30, 70, -70];

const commonStyle = { fill: "none", stroke: "#000", strokeWidth: "0.5px" };

export type TCartImageType = "check" | "cross";
type TProps = {
  type: TCartImageType;
};

export default function CartImage({ type }: TProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    async function startAnimation() {
      animate(
        "#printer",
        {
          opacity: 1,
          scale: [0.5, 1],
        },
        {
          scale: {
            type: "spring",
            damping: 20,
            stiffness: 500,
          },
        }
      );

      animate(
        `#${type}`,
        {
          opacity: [0, 1],
          scale: [0.5, 1],
        },
        {
          opacity: {
            delay: 0.2,
          },
          scale: {
            delay: 0.2,
            type: "spring",
            damping: 8,
            stiffness: 500,
          },
        }
      );

      let index = 0;
      for (let i of stripes) {
        animate(
          "#stripe-" + index,
          {
            opacity: 1,
            x: [i, i * -1],
          },
          {
            opacity: {
              delay: 0.5,
              duration: 2,
            },
            x: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 5,
              ease: "easeInOut",
            },
          }
        );
        index++;
      }
    }

    startAnimation();
  }, []);

  return (
    <div ref={scope} className="h-[320px]">
      <div className="relative h-full">
        <svg
          id="printer"
          className="w-full h-full opacity-0"
          viewBox="0 0 28 32"
          version="1.1"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.5",
          }}
        >
          <g>
            <path
              d="M8.329,11.598c0.12,-1.68 -0.023,-3.775 -0.84,-5.76c-3.36,-8.16 17.76,-7.2 13.68,1.68"
              style={commonStyle}
            />
            <path
              d="M25.57,10.004l-0,19.2c-0,1.325 -1.075,2.4 -2.4,2.4l-19.2,0c-1.325,0 -2.4,-1.075 -2.4,-2.4l-0,-19.2c-0,-1.324 1.075,-2.4 2.4,-2.4l19.2,0c1.325,0 2.4,1.076 2.4,2.4Z"
              style={commonStyle}
            />
            <path
              d="M23.17,11.924l-0,15.36c-0,1.06 -0.86,1.92 -1.92,1.92l-15.36,0c-1.06,0 -1.92,-0.86 -1.92,-1.92l-0,-15.36c-0,-1.06 0.86,-1.92 1.92,-1.92l15.36,0c1.06,0 1.92,0.86 1.92,1.92Z"
              style={commonStyle}
            />
            <path
              d="M10.09,12.044l-0,4.08c-0,0.199 -0.161,0.36 -0.36,0.36l-2.88,0c-0.199,0 -0.36,-0.161 -0.36,-0.36l-0,-4.08c-0,-0.199 0.161,-0.36 0.36,-0.36l2.88,0c0.199,0 0.36,0.161 0.36,0.36Z"
              style={commonStyle}
            />
            <path d="M8.29,16.604l-0,1.2" style={commonStyle} />
            <path d="M0.25,19.124l26.64,0" style={commonStyle} />
          </g>
        </svg>
        <svg
          id="cross"
          className="absolute size-20 right-0 -bottom-5 opacity-0"
          viewBox="0 0 12 12"
          version="1.1"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.5",
          }}
        >
          <path
            d="M9.061,0.25l1.763,1.762l-3.525,3.525l3.525,3.524l-1.763,1.763l-3.524,-3.525l-3.525,3.525l-1.762,-1.763l3.525,-3.524l-3.525,-3.525l1.762,-1.762l3.525,3.525l3.524,-3.525Z"
            style={{ fill: "#f80000", stroke: "#000", strokeWidth: "0.5px" }}
          />
        </svg>
        <svg
          id="check"
          className="absolute size-20 right-0 -bottom-5 opacity-0"
          viewBox="0 0 15 12"
          version="1.1"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.5",
          }}
        >
          <path
            d="M1.947,3.814l3.564,3.564l7.128,-7.128l1.697,1.697l-8.825,8.825l-5.261,-5.261l1.697,-1.697Z"
            style={{
              fill: "#37aa00",
              stroke: "#000",
              strokeWidth: "0.5px",
            }}
          />
        </svg>
        <div className="absolute inset-x-0 top-[135px] flex flex-col justify-center items-center gap-6">
          {stripes.map((i, index) => (
            <div
              id={"stripe-" + index}
              key={index}
              className="opacity-0 rounded-full w-[350px] h-[20px] bg-dark bg-opacity-5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
