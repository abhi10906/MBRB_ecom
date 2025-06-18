/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        cta: "rgb(13 148 136 / var(--tw-bg-opacity))",
        secondary: "#E8B86D",
        ternary: "rgb(244 63 94 / var(--tw-bg-opacity))",
      },
    },
  },
  plugins: [],
});
