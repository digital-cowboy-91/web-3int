import Action from "../../Buttons/Action";
import Heading from "./Heading";
import "./Hero.style.css";
import PrintHead from "./PrintHead/PrintHead";

export default function Hero() {
  return (
    <section className="hero-v3">
      <div className="hero-v3--wrapper">
        <div className="hero-v3--col1">
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
    </section>
  );
}
