const path = require('path');
const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../lib/**/*.stories.mdx',
    '../lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons],
  webpackFinal: async (config, { configType }) => {
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    config.module.rules.push({
      test: /\.((sa|sc)ss)$/i,
      use: [
        'style-loader',
        'css-modules-typescript-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss')({
                  config: path.join(__dirname, '../tailwind.config.js')
                }),
                require('autoprefixer'),
              ],
            },
          },
        },
        'sass-loader'
      ]
    });

    return config;
  },
};
