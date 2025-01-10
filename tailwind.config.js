/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0dc5a4",
          dark: "#0a9882",
          light: "#4fdbc2",
        },
        secondary: {
          DEFAULT: "#171f40",
          dark: "#111731",
          light: "#1e2750",
        },
        accent: "#ffd700",
      },
      fontFamily: {
        sans: ["Barlow Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
