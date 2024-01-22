"use client";
import { useRouter } from "next/navigation";
import LogoAnimated from "../LogoAnimated";

const LogoButton = () => {
  const router = useRouter();
  return (
    <LogoAnimated
      color="#ffffff"
      height="120px"
      className="mx-auto cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default LogoButton;
