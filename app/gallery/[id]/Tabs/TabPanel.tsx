import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  className?: string;
  id: string;
};

export default function TabPanel({ children, className, id }: TProps) {
  return (
    <div
      data-tab-panel={id}
      data-tab-panel-active="false"
      className={`${className} data-[tab-panel-active="false"]:hidden`}
    >
      {children}
    </div>
  );
}
