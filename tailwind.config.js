const theme = require("./src/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/layout/**/*.{js,jsx,ts,tsx}",
    "./src/ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
        },
      },
      fontFamily: {
        sans: [theme.fonts.body],
        heading: [theme.fonts.heading],
      },
    },
  },
  plugins: [],
};
