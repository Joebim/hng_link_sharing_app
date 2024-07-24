import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          default: "#633CFF",
          100: "#EFEBFF",
          200: "#BEADFF",
        },
        red: "#FF3939",
        grey: {
          100: "#FAFAFA",
          200: "#D9D9D9",
          300: "#737373",
        },
        dark: "#333333"
      },
      fontSize: {
        'heading-m': '32px',
        'heading-s': '16px',
        'body-m': '16px',
        'body-s': '12px',
      },
      fontWeight: {
        bold: '700',
        regular: '400',
      },
      boxShadow: {
        'custom-purple': '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
        'custom-purple-light': '0px 0px 32px 0px rgba(99, 60, 255, 0.15)',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus'], 
      boxShadow: ['focus'],
    },
  },
  plugins: [],
};
export default config;
