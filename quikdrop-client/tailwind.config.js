export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },

    extend: {
      fontFamily: {
        ruda: "'Ruda', sans-serif",
        ubuntu: "'Ubuntu', sans-serif",
      },
    },
  },
  plugins: [],
};
