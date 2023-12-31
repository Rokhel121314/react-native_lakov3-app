/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-dianne": "#344C57",
        "deep-amethyst": "#9F89AB",
      },
      backgroundColor: {
        "blue-dianne": "#344C57",
        "deep-amethyst": "#9F89AB",
        "blue-dianne-blur": "rgba(20, 30, 34, .8)",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      borderColor: {
        "blue-dianne": "#344C57",
        "deep-amethyst": "#9F89AB",
      },
    },
  },
  plugins: [],
};
