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
      accent: '#ff4713',
      primary: '#ffffff',
      secondary: '',
      gray: '#6b7280',
      'gray-light': '#f3f4f6',
      'gray-ultra-light': '#e5e7eb',
      'gray-medium': '#9ca3af',
      'gray-dark': '#374151'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    fontFamily: {
      main: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        bgImgWhite: "url('/src/assets/images/background-white-abstract.jpeg')"
      }
    }
  },
  plugins: []
}
