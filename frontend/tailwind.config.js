/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Charte graphique maquette Figma — ne pas modifier ces valeurs
      colors: {
        "portfolio-black":  "#171c21",
        "portfolio-green":  "#cdfb7c",
        "portfolio-purple": "#aa7cfb",
        "portfolio-purple-dark": "#8b5ae2",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        crimson:  ['"Crimson Text"', "serif"],
      },
      // Tailles de texte exactes de la maquette
      fontSize: {
        "display": ["120px", { lineHeight: "normal" }],
        "heading":  ["80px",  { lineHeight: "0.9"    }],
        "section":  ["32px",  { lineHeight: "normal" }],
        "body-lg":  ["24px",  { lineHeight: "normal" }],
        "body-md":  ["20px",  { lineHeight: "normal" }],
        "body-sm":  ["16px",  { lineHeight: "normal" }],
      },
    },
  },
  plugins: [],
};
