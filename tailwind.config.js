/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-dianne": "#344C57",
      },
      backgroundColor: {
        "blue-dianne": "#344C57",
      },
    },
  },
  plugins: [],
};
