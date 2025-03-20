import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"SF Pro Text"', 
          '"SF Pro Display"', 
          '"San Francisco"', 
          'system-ui', 
          'sans-serif'
        ],
        display: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"SF Pro Display"', 
          'system-ui', 
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
