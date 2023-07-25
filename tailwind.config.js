/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      screens:{
        xxs:'370px',
        xs:'480px'
      }
      ,
      colors: {
        custom:
          "linear-gradient(90deg, rgba(0,179,209,1) 0%, rgba(65,121,230,1) 67%, rgba(8,145,178,1) 100%)",
      },
    },
  },
  plugins: [],
};
