"use client";

import Action from "@/app/components/Actions/Action";
import Loader from "@/app/components/Loader";
import { UUID } from "crypto";
import { useState } from "react";

export default function DownloadButton({ downloadId }: { downloadId: UUID }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = () => {
    setIsProcessing(true);
    fetch("/d/" + downloadId).then((res) => {
      const el = document.createElement("a");
      el.href = res.url;
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
      window.URL.revokeObjectURL(res.url);
      setIsProcessing(false);
    });
  };

  return (
    <Action
      as={"button"}
      label={isProcessing ? <Loader /> : "Download"}
      className="float-right"
      onClick={handleDownload}
      disabled={isProcessing}
    />
  );
}
