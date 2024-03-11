import { useMediaQuery } from "react-responsive";
import config from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const breakpoints = resolveConfig(config).theme.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useTailwindBreakpoint<K extends BreakpointKey>(
  breakpointKey: K
) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });

  return bool;
}
