"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CSSButtonOutline } from "../styles";

async function exitPreview() {
  const res = await fetch("/api/preview?exit=true");

  if (res.status === 200) {
    location.reload();
  } else {
    alert("Failed to exit preview mode");
  }
}

const PreviewBar = () => {
  return (
    <div className="bg-error px-5 py-2 text-white fixed z-[9999] bottom-0 top-screen w-full flex justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <ExclamationTriangleIcon width={"1rem"} />
        <div>You are viewing this site in preview mode</div>
      </div>
      <button onClick={exitPreview} className={CSSButtonOutline}>
        Exit mode
      </button>
    </div>
  );
};

export default PreviewBar;
