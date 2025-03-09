import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";
//==================>

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generateThemesObjects = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};

  baseColors.forEach((color) => {
    theme[color] = {};

    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadekey = invert ? value : key;
      theme[color][key] = colors[color][shadekey];
    });
  });

  return theme;
};
const lithThem = generateThemesObjects(colors, shadeMapping);
const darkThem = generateThemesObjects(colors, shadeMapping, true);
const themes = {
  light: {
    ...lithThem,
    white: "#ffffff",
  },
  dark: {
    ...darkThem,
    white: colors.gray["950"],
    black: colors.black,
  },
};
//================>
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)],
} satisfies Config;
