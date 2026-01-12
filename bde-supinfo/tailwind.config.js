/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        supinfo: {
          'purple-dark': '#1A0B36', // Le nouveau violet très foncé pour le menu
          purple: '#311E66',        // Le violet standard SUPINFO
          orange: '#B7651D',
        }
      }
    },
  },
  plugins: [],
}