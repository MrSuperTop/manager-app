const { join } = require('path');
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    join(__dirname, "./lib/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./lib/**/*.scss"),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.teal,
          DEFAULT: colors.teal['600'],
          darker: colors.teal['700'],
          loading: '#add5d5'
        },
        secondary: {
          ...colors.amber,
          DEFAULT: colors.amber['500'],
          darker: colors.amber['400'],
          loading: '#fddb84'
        }
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('group-item', '.components-group > &')
      addVariant('deep-group-item', '.components-group &')
    })
  ]
};