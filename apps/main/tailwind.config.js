const { join } = require('path');
const globalConfig = require('../../tailwind.config')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  ...globalConfig,
  content: [
    join(__dirname, "./src/pages/**/*.{js,ts,jsx,tsx,scss}"),
    join(__dirname, "./src/components/**/*.{js,ts,jsx,tsx,scss}"),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      ...globalConfig.theme.extend
    }
  },
  plugins: [
    ...globalConfig.plugins
  ],
};