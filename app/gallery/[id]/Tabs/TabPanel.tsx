import { HTMLAttributes, ReactNode } from "react";

type TProps = {
  children?: ReactNode;
  className?: string;
  id: string;
} & HTMLAttributes<HTMLDivElement>;

export default function TabPanel({
  children,
  className,
  id,
  ...props
}: TProps) {
  return (
    <div
      data-tab-panel={id}
      data-tab-panel-active="false"
      className={`${className} data-[tab-panel-active="false"]:hidden`}
      {...props}
    >
      {children}
    </div>
  );
}
