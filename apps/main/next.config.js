// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

function regexEqual(x, y) {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
}

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    // * Modify default next sass loaders to enable type generation for sass module files
    const nextCssLoaders = config.module.rules.find((rule) => typeof rule.oneOf === 'object');
    const nextSassLoader = nextCssLoaders.oneOf.find((rule) => rule.sideEffects === false &&
                regexEqual(rule.test, /\.module\.(scss|sass)$/));

    if (nextSassLoader.use[0].loader === 'next-style-loader') {
      nextSassLoader.use.splice(0, 1, 'css-modules-typescript-loader')
    }

    return config;
  },
  images: {
    domains: ['avatars.dicebear.com'] 
  },
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/',
        has: [
          {
            type: 'cookie',
            key: 'sess_id',
            value: undefined,
          },
        ],
        permanent: false
      },
      {
        source: '/login',
        destination: '/',
        has: [
          {
            type: 'cookie',
            key: 'sess_id',
            value: undefined,
          },
        ],
        permanent: false
      },
      {
        source: '/settings',
        destination: '/',
        has: [
          {
            type: 'cookie',
            key: 'sess_id',
            value: '',
          },
        ],
        permanent: false
      },
    ]
  }
};

module.exports = withNx(nextConfig);
