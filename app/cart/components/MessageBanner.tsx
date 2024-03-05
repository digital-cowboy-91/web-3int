import {
  ChatBubbleBottomCenterIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export type TMsgType = "info" | "success" | "warning" | "error";
type TProps = {
  type: TMsgType;
  text: string;
};

export default function MessageBanner({ type, text }: TProps) {
  let icon, borderColor, textColor;

  switch (type) {
    case "info":
      icon = <ChatBubbleBottomCenterIcon />;
      borderColor = "border-blue-500";
      textColor = "text-blue-500";
      break;
    case "success":
      icon = <CheckCircleIcon />;
      borderColor = "border-green-500";
      textColor = "text-green-500";
      break;
    case "warning":
      icon = <ExclamationTriangleIcon />;
      borderColor = "border-yellow-500";
      textColor = "text-yellow-500";
      break;
    case "error":
      icon = <NoSymbolIcon />;
      borderColor = "border-red-500";
      textColor = "text-red-500";
      break;
  }

  return (
    <div
      className={`w-full rounded-md border-2 inline-flex items-center ${borderColor}`}
    >
      <div className={`m-4 size-6 ${textColor}`}>{icon}</div>
      {text}
    </div>
  );
}
