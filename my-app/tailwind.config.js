/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily:{
      Roboto: ["Roboto", "sans-serif"],
      Montserrat: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      OpenSans:['Open Sans','Helvetica Neue', 'Arial', 'sans-serif'],
      playball:['Playball','sans-serif']
    },
    extend: {},
  },
  plugins: [],
});

