/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem", // 16px
    },
    extend: {
      colors: {
        primary: "#43A64E",
        secondary: "#FD3D57",
        tertiary: "",
      },
      fontFamily: {
        poppins: ["Poppins"],
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
