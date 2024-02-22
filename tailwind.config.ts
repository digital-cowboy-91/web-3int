import type { Config } from "tailwindcss";
import { colors } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "2/5": "40%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        dark: "#0D0C0C",
        primary: {
          DEFAULT: "#0D79F2",
          light: "#0D79F2",
        },
        action: {
          DEFAULT: "#ffcd00",
        },
        grey: {
          DEFAULT: "#808080",
          light: "#EBEBEB",
        },
        error: {
          DEFAULT: "#ff0000",
        },
        success: {
          DEFAULT: "#3cb012",
          light: "#95de76",
        },
      },
    },
    colors,
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
    },
    boxShadow: {
      DEFAULT: "5px 5px 20px 5px rgba(0, 0, 0, 0.3)",
    },
  },
  plugins: [],
};
export default config;
