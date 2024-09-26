import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
  },
  theme: {
    extend: {
      colors: {
        "zenith-light-yellow": "var(--zenith-light-yellow)",
        "zenith-yellow": "var(--zenith-yellow)",
        "zenith-dark-yellow": "var(--zenith-dark-yellow)",
        "zenith-light-purple": "var(--zenith-light-purple)",
        "zenith-purple": "var(--zenith-purple)",
        "zenith-dark-purple": "var(--zenith-dark-purple)",
      },
      height: {
        "screen-without-header" : "calc(100svh - 4rem)"
      }
    },
  },
  plugins: [
    
  ]
};
export default config;