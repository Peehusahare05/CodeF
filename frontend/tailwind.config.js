/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        "primary-light": "#22c55e",
        accent: "#38bdf8",
        "soft-bg": "#f8fafc",
        "text-main": "#1e293b",
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
