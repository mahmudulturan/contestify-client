/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        textCol: "#FFFFFF",
        bgCol: "#1F2340",
        primaryCol: "#0ECDB9",
        seconderyCol: "#1B1D4D",
        accentCol: "#203CB8",
        cardCol: "#353b68",
      }
    },
  },
  plugins: [],
}

