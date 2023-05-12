/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2BAE66FF",
          DEFAULT: "#2C5F2D",
        },
        secondary: { DEFAULT: "#97BC62FF" },
      },
    },
  },
  plugins: [],
};
