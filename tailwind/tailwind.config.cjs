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
      accentLight1: '#ff7e5a',
      accentLight2: '#ffa389',
      accentLight3: '#ffdad0',
      accentLight4: '#ff7e5a4f',
      accentLight5: '#ffede7'
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
        bgImgWhite: "url('/src/assets/images/4K-White-Wallpaper.jpeg')"
      }
    }
  },
  plugins: []
}
