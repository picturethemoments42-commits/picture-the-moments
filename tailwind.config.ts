import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#0C0908",
        surface: "#13140D",
        "maroon-black": "#1A0F0E",
        gold: "#D4AF37",
        ivory: "#FDFBF7",
        muted: "#D1C4C0",
        outline: "#4D4542",
        emerald: "#2F6F5E",
        royal: "#253F8F"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"]
      },
      maxWidth: {
        container: "1440px"
      }
    }
  },
  plugins: []
};

export default config;
