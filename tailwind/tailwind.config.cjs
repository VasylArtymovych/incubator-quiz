/** @type {import('tailwindcss').Config} */

const colors = require('./tailwind.colors.cjs')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      ...colors,
      bgDark1: '#080814;',
      bgLight: '#8489c2',
      bgDark: '#292a73',
      bgMedium: '#5e64ab',
      accent: '#ff4713',
      grd1: '#8269e7',
      grd2: '#6089e9',
      grd3: '#68c0e8',
      primary: '#0f172a',
      gray: '#6b7280',
      'gray-light': '#f3f4f6',
      'gray-ultra-light': '#e5e7eb',
      'gray-medium': '#9ca3af',
      'gray-dark': '#374151'
    },
    fontFamily: {
      main: ['Inter', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
