import { ButtonHTMLAttributes, ReactNode } from "react";

const darkColours = ["primary", "action"];

function classComposer(colour: string, border: string) {
  const classes = [
    "flex items-center gap-4 px-4 py-2 border-2 font-bold uppercase disabled:text-grey transition-all",
  ];

  if (border === "outline") {
    classes.push(
      `rounded-full disabled:border-grey border-${colour} hover:bg-${colour} hover:text-${
        darkColours.includes(colour) ? "white" : "dark"
      }`
    );
  } else {
    classes.push(`border-transparent hover:border-b-${colour}`);
  }

  return classes.join(" ");
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  colour: "primary" | "success" | "action";
  border: "outline" | "underline";
};

export default function TWButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={classComposer(props.colour, props.border)}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
