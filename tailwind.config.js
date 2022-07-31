/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sign-light-brown': '#FDEADC',
        'sign-light-green': '#E7FDDC',
        'sign-dark-brown': '#B79175',
        'sign-dark-green': '#61884F',
        'c-light-brown': '#F8EFE9',
        'c-dark-brown': '#604837',
      }
    },
  },
  plugins: [],
}
