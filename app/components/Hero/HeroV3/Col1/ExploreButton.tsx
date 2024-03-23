import "./ExploreButton.style.css";

export default function ExploreButton() {
  return (
    <button
      id="hero-v3--explore-button"
      className="uppercase font-semibold inline-flex gap-3 items-center"
    >
      <div className="size-10 border-2 rounded-full border-v3yellow p-2 transition-colors">
        <svg
          viewBox="0 0 32 32"
          className="stroke-v3dark"
          style={{
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none",
            strokeWidth: "3.5px",
          }}
        >
          <path d="M1.75,16L30.25,16" />
          <path d="M5,5L30.25,16L5,27" />
        </svg>
      </div>
      <span className="border-b-2 border-transparent">
        Ex<span className="text-v3yellow">plore</span>
      </span>
    </button>
  );
}
