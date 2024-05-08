/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"], // Roboto as default sans-serif font
    },
    extend: {
      colors: {
        lightgray: "#edeff2",
        deepblue: "#23518E",
        themeblue: "#446b9f",
        lightblue: "#5FB2E1",
        yesgreen: "#5A7F2D",
        nored: "#CA4340",
        somewhatamber: "#E1A325",
        oddgray: "#FDFDFE",
        evengray: "#FAFAFB",
      },
      backgroundImage: {
        bridge: "url(/bridge.png)"
      }
    },
  },
  plugins: [],
};
