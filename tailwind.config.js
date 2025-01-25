/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#eff6ff",
        primary: "#1d4ed8",
        text: "#172554",
        border: "#60a5fa"
      }
    },
  },
  plugins: [],
}