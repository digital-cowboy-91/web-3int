import Action from "../../Buttons/Action";
import Heading from "./Col1/Heading";
import PrintHead from "./Col2/PrintHead";
import DynamicBg from "./DynamicBg";
import "./Hero.style.css";
import NoisyGradientShape from "./NoisyGradientShape";

export default function Hero() {
  return (
    <section className="hero-v3">
      <div className="hero-v3--wrapper">
        <div className="hero-v3--col1">
          <NoisyGradientShape
            id="printHeadBg"
            className="absolute inset-0 -z-20"
            shape="circle"
            gradient={{
              colors: {
                from: "#00D8AE",
                to: "#04A586",
                noise: "#00D8AE",
              },
              steps: [
                {
                  offset: "0%",
                  opacity: 1,
                },
                {
                  offset: "66%",
                  opacity: 0.5,
                },
                {
                  offset: "100%",
                  opacity: 0,
                },
              ],
            }}
          />
          <PrintHead />
        </div>
        <div className="hero-v3--col2">
          <div />
          <Heading />
          <div>
            <p>
              through our 3D printing services. Browse our gallery for
              inspiration and purchases, or contact us if you already have
              something in mind. Together, let's make it real!
            </p>
            <div>
              <Action
                as="button"
                variant="outline"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  >
                    <path d="M1,12L23,12" />
                    <path d="M4,4L23,12L4,20" />
                  </svg>
                }
                label={
                  <span>
                    Ex<span className="text-v3yellow">plore</span>
                  </span>
                }
              />
              <Action as="button" label="Get quote" />
            </div>
          </div>
        </div>
      </div>
      <DynamicBg />
    </section>
  );
}
