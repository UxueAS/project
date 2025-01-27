/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'default': 'Montserrat'
      },
      colors: {
        primary: '#F5A700',
        'dark-grey': '#333333',
      }
    },
  },
  plugins: [],
}

