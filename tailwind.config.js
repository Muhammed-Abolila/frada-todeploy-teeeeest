module.exports = {
  important: true, 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "300px",
      sm: "640px",
      // sm :"400px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        lightGray: "#EDEDED",
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkOrange: "#D07A51",
        darkGray: "#707070",
        opacity: "#F6F6F6",
        lightOrange: "rgba(233,194,175,255)",
        darkGray: "#f2f2f2",
        blackOpacity: "rgb(12 9 7 / 83%)",
        secondColor: "#f2f2f2",
        blackColor: "#000",
        whiteColor: "#fff",
        mainColor: "#d27a51",



        orange: "rgb(210, 122, 81)",
        darkGray: "#515151",
        lightGray: "#E6E6E6",
        foreground: "var(--foreground)",
        lightGrayy: "#F2F2F2",
        white: "#fff",
        black_opacity: "rgba(0,0,0,0.33)",
        brown: "#A15F50",
        lightBrown: "#D27A51",
        lightPink: "#FFEEE6",
        orangeOpacity: "rgba(210, 122, 81, 0.6)",
        error : "red"
      },
    },
  },
  plugins: [],
};
