/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    colors: {
      "midnight-blue": "#190482",
      "royal-purple": "#7752FE",
      "serene-lavender": "#8E8FFA",
      "gentle-sky": "#C2D9FF",
    }
  },
  plugins: [require("flowbite/plugin")],
};
