const { join } = require('path');
const globalConfig = require('../../tailwind.config')

module.exports = {
  ...globalConfig,
  content: [
    join(__dirname, "./lib/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./lib/**/*.scss"),
  ],
  theme: {
    extend: {
      ...globalConfig.theme.extend
    }
  },
  plugins: [
    ...globalConfig.plugins
  ]
};