import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    colors: {
      vm: {
        100: "#E2E8F0",
        200: "#9290C3",
        700: "#0f172a",
        800: "#1E1D37",
        900: "#020617"
      },
      violet: {
        500: "#8B5CF6"
      },
      red: {
        300: "#EF4444"
      },
      green: {
        600: "#16a34a",
        700: "#15803d"
      }
    },
    fontFamily: {
      jetbrains: "JetBrains Mono",
      poppins: "Poppins"
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        "postify-lg": "450px",
        "postify-xl": "650px",
      },
      fontSize: {
        "2md": "16px"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config