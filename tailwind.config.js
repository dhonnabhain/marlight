module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      fontFamily: {
        app: "OpenSans",
      },
      screens: {
        "3xl": "1792px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
