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
      fontSize: {
        "2xs": ["10px", "12px"],
      },
      maxWidth: {
        "2/5": "40%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        // custom
        light: "#ebebeb",
        // neutral-700
        dark: "#404040",
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
          light: "#d9e5d5",
        },
        v3yellow: {
          DEFAULT: "#F1FF00",
        },
        v3green: {
          DEFAULT: "#04A586",
          light: "#00D8AE",
        },
        v3dark: {
          DEFAULT: "#333333",
          deep: "#141414",
        },
        v3grey: {
          DEFAULT: "#EBEBEB",
          deep: "#BEBEBE",
        },
      },
      boxShadow: {
        DEFAULT: "5px 5px 20px 5px rgba(0, 0, 0, 0.3)",
        sm: "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)",
        md: "3px 3px 5px rgba(0, 0, 0, 0.3)",
      },
      dropShadow: {
        // DEFAULT: [
        //   "2px 2px 3px rgba(0, 0, 0, 0.3)",
        //   "-2px -2px 3px rgba(255, 255, 255, 0.3)",
        // ],
        DEFAULT: ["3px 3px 5px rgba(0, 0, 0, 0.3)"],
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
  },
  plugins: [],
};
export default config;
