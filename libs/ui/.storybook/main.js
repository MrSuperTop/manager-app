const path = require('path');
const rootMain = require('../../../.storybook/main');
const { ProvidePlugin } = require('webpack');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../lib/**/*.stories.mdx',
    '../lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    ...rootMain.addons
  ],
  webpackFinal: async (config, { configType }) => {
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    config.module.rules = config.module.rules.filter((rule) => {
      return rule.test.toString() !== '/\\.(mjs|tsx?|jsx?)$/'
    });

    config.optimization.minimizer = [
      new ESBuildMinifyPlugin({
        target: 'es2015'
      })
    ]

    config.plugins = [
      ...config.plugins,
      new ProvidePlugin({
        React: "react"
      })
    ];

    const paths = require('../../../tsconfig.base.json').compilerOptions.paths;

    const webpackResolveAlisases = {};

    for (const [key, value] of Object.entries(paths)) {
      webpackResolveAlisases[key] = value[0];
    }

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...webpackResolveAlisases,
        '@nx-manager-app/shared-utils': path.resolve(__filename, '../../../shared-utils/lib/index.ts')
      },
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(mjs|tsx?|jsx?)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: require('./tsconfig.json')
        }
      },
      {
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
      }
    ];

    return config;
  },
};
