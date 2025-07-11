/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray:{
          50: "rgba(255,255,255,0.5)",
          100:"#ebebeb",  //ebebeb 
          200:"#e6e9ed",
          600:"#95989c"
        },
        blue:{
          400:"#798ec6",
          500:"#2e4990"
        },
        purple: {
          200: "#d3d8e9", // d9ddee
          300:"#dbd2ff",
          500: "#9492db",

          600: "#66437a", // 7164c0
          700:"#3c2f56",
        },
        
      },
    },
  },
  plugins: [],
};
