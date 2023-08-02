/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        Oxygen: ["Oxygen", "sans-serif"],
        Pacifico: ["Pacifico", "Cursive"],
      },
      backgroundImage: {
        "hero-pattern": "url('/Images/iNewBG.png')",
        "bg-pattern": "url('/Images/BGBG.png')",
      },
      keyframes: {
        fadein: {
          from: { opacity: "0%" },
          to: { opacity: "100%" },
        },
      },
      animation: {
        fadein: "fadein 250ms ease-in-out",
      },
    },
  },
  plugins: [],
};
