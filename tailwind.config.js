/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require(`@tailwindcss/typography`), require("@tailwindcss/forms")],
  corePlugins: {
    preflight: false,
  },
}
