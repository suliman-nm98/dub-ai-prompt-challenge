/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "space-primary": "#6D28D9",
        "space-secondary": "#4C1D95",
        "space-accent": "#10B981",
        "space-dark": "#0F172A",
        "space-light": "#E2E8F0",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(109, 40, 217, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(109, 40, 217, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropFilter: {
        glass: "blur(16px) saturate(180%)",
      },
    },
  },
  plugins: [],
};
