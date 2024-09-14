import type { Config } from "tailwindcss";
import fluid, { extract } from 'fluid-tailwind'

const config: Config = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract
  },
  theme: {
    extend: {
      colors: {
        "zenith-yellow": "var(--zenith-yellow)",
        "zenith-light-purple": "var(--zenith-light-purple)",
        "zenith-purple": "var(--zenith-purple)",
        "zenith-dark-purple": "var(--zenith-dark-purple)",
      },
    },
  },
  plugins: [
    fluid
  ],
  
};
export default config;