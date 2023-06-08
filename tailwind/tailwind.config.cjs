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
      accentLight5: '#ffede7',
      bgrDark: '#262a2b',
      bgrDarkAlpha: 'rgba(0, 0, 0, 0.7)',
      borderCard: '#252727',
      titleWhite: '#b7b7b7'

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
        bgImgWhite: "url('src/assets/images/white-background.jpg')",
        gradientX: 'linear-gradient(40deg, rgba(128, 128, 128, 0.385) 10%, rgba(255, 255, 255, 0.92) 38%, white 45%, rgba(255, 255, 255, 0.921) 57%,  rgba(128, 128, 128, 0.385) 90%), linear-gradient(145deg, grey 45%, #ef3c0bb9 50%,  #ef3c0bb9 60%, grey 65%, grey 90%)',
        gradientCrossLine: 'linear-gradient(45deg, grey 5%, white 30%,  white 35%, #ef3c0b8f 45%,white 55%, white 60%, grey 90%)',
        gradientTableCard: 'linear-gradient(130deg, #515660 10%, white 53%,  transparent 55%, white 60%)',
        borderGradient: 'linear-gradient(130deg, #ff4713, #ffffff 41.07%, #000000 76.05%)',
        borderGradient2: 'linear-gradient(220deg, #ff4713, #ffffff 41.07%, #000000 76.05%)',
        borderGradientChecked: 'linear-gradient(220deg, #1f7a31, #6eb47c 41.07%, #1f7a31 76.05%)'
      }
    }
  },
  plugins: []
}
