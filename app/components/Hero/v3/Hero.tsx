import Action from "../../Actions/Action";
import Heading from "./Heading";
import "./Hero.style.css";
import PrintHead from "./PrintHead/PrintHead";

export default function Hero() {
  return (
    <section id="hero" className="hero-v3 main-gradient">
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
                as="link"
                href={"/gallery"}
                variant="outlined"
                active="icon"
                color="secondary"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  >
                    <path d="M4,12L20,12" />
                    <path d="M8,4L20,12L8,20" />
                  </svg>
                }
                label="Explore"
              />
              <Action
                as="link"
                href="/contact"
                label="Get Quote"
                color="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
