"use client";

import { usePathname } from "next/navigation";
import "./StepIndicator.style.css";

const steps = [
  {
    name: "Review",
    path: "/cart",
  },
  {
    name: "Checkout",
    path: "/cart/checkout",
  },
];

export default function StepIndicator({ className }: { className?: string }) {
  const location = usePathname();
  const currentStep = steps.findIndex(({ path }) => location === path);

  return (
    <div className={`step-indicator ${className}`}>
      {steps.map(({ name, path }, index) => (
        <div
          key={path}
          className={`step ${currentStep === index ? "step--active" : ""}`}
        >
          <div>{index + 1}</div>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}
