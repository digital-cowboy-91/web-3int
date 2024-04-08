import type { Config } from "tailwindcss";
import { colors } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "2xs": ["0.7rem", "1rem"],
        md: ["1rem", "1.3rem"],
      },
      maxWidth: {
        "2/5": "40%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
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
        light: {
          DEFAULT: "rgb(var(--coords-light))",
        },
        dark: {
          DEFAULT: "rgb(var(--coords-dark))",
          deep: "rgb(var(--coords-dark-deep))",
        },
        primary: {
          DEFAULT: "rgb(var(--coords-primary))",
          deep: "rgb(var(--coords-primary-deep))",
        },
        secondary: {
          DEFAULT: "rgb(var(--coords-secondary))",
        },
        neutral: {
          DEFAULT: "rgb(var(--coords-neutral))",
          deep: "rgb(var(--coords-neutral-deep))",
        },
        def: {
          bg: "var(--def-bg)",
          text: "var(--def-text)",
          link: "var(--rgb-link)",
          invert_bg: "var(--invert--def-bg)",
          invert_text: "var(--invert--def-text)",
        },
        auto: {
          white: "var(--auto-white)",
          link: "var(--auto-link)",
          text: "var(--auto-text)",
        },
      },
      boxShadow: {
        DEFAULT: "3px 3px 5px rgba(0, 0, 0, 0.3)",
        sm: "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)",
        md: "5px 5px 10px 10px rgba(0, 0, 0, 0.3)",
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
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
