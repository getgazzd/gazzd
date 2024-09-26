const { readBuilderProgram } = require("typescript");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        "3xl": "1650px",
        "4xl": "1920px",
      },
      fontFamily: {
        frank: ["Frank", "sans-serif"],
        highlander: ["Highlander", "display"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        borderGray: "rgba(255,255,255,0.1)",
        gray: colors.gray,
        white: colors.white,
        green: colors.lime,
        red: colors.rose,
        blue: colors.indigo,
        streakingStrawberries: "#FF3333",
        blueberryBlizz: "#3344FF",
        locoLemon: "#FFFF00",
        peskyPineapple: "#FF9900",
        atomicApple: "#99FF33",
        lividLime: "#33CC33",
        brand: {
          twitch: "#9146ff",
          youtube: "#ff0000",
          twitter: "#1da1f2",
        },
      },
      maxWidth: {
        "8xl": "1920px",
      },
      spacing: {
        128: "32rem",
      },
      aspectRatio: {
        square: "1/1",
        video: "16/9",
      },

      animation: {
        text: "text 8s ease infinite",
        marquee: "marquee 20s linear infinite",
        marquee2: "marquee2 20s linear infinite",
        border: "border 4s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        border: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
