/* eslint-disable */
const { ProvidePlugin } = require('webpack');
const path = require('path');

const redirectsPlugin = [
  '@docusaurus/plugin-client-redirects',
  {
    redirects: [
      {
        from: [
          '/essentials',
          '/essentials/overview'
        ],
        to: '/what-is-macrometa'
      },
      {
        from: '/essentials/CLI/commands',
        to: '/cli/'
      },
      {
        from: '/essentials/geofabrics',
        to: '/geofabrics'
      },
      {
        from: '/essentials/troubleshooting',
        to: '/references/troubleshooting'
      }
    ]
  }
];

const tailwindPlugin = (context, options) => {
    return {
      name: 'tailwind-plugin',
      configurePostCss(postcssOptions) {
        postcssOptions.plugins = [
          require('postcss-import'),
          require('tailwindcss/nesting'),
          require('tailwindcss'),
          require('autoprefixer'),
        ];
        return postcssOptions;
      },
    };
  };

const webpackPlugin = (context, options) => {
  return {
    name: 'webpack-plugin',
    configureWebpack(config) {
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
        plugins: [
          new ProvidePlugin({
            process: require.resolve('process/browser'),
          }),
        ],
        resolve: {
          fallback: {
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            buffer: require.resolve('buffer/'),
          },
          alias: {
            process: 'process/browser.js',
          },
        },
      };
    },
  };
};

module.exports = {
  redirectsPlugin,
  tailwindPlugin,
  webpackPlugin
};