export const CSSContainer = "container relative";

const LinkDefault =
  "px-2 md:px-4 py-1 border-b-2 font-bold border-transparent uppercase duration-300";
export const CSSLink = `${LinkDefault} hover:border-current`;
export const CSSButtonLink = `${LinkDefault} disabled:text-grey enabled:hover:border-current`;

const OutlineDefault =
  "px-2 md:px-4 py-1 border-2 font-bold uppercase duration-300";
export const CSSLinkOutline = `${OutlineDefault} hover:rounded-[.5rem]`;
export const CSSButtonOutline = `${OutlineDefault} disabled:text-grey disabled:border-grey enabled:hover:rounded-[.5rem]`;

export const CSSFormElement =
  "block px-3 pb-2 pt-4 w-full bg-transparent border-b border-grey appearance-none focus:outline-none focus:ring-0 focus:border-primary focus:border-b-2 peer";
export const CSSFormElementLabel =
  "absolute text-grey duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:px-0 peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4";

const darkColours = ["primary", "success"];

export function TWButton(colour: "primary" | "success" | "action") {
  return `flex items-center gap-4 px-4 py-2 rounded-full border-2 font-bold uppercase ${TWButtonColour(
    colour
  )}`;
}

export function TWButtonColour(colour: "primary" | "success" | "action") {
  return `disabled:border-grey disabled:text-grey disabled:text-grey border-${colour} hover:bg-${colour} hover:text-${
    darkColours.includes(colour) ? "white" : "dark"
  } transition-all`;
}
