// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {
  tailwindPlugin,
  webpackPlugin,
} = require('./src/plugins');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Macrometa',
  tagline: 'Macrometa GDN Documentation',
  url: 'https://macrometa.com',
  baseUrl: isDev ? '/' : '/docs-new/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'macrometacorp', // Usually your GitHub org/user name.
  projectName: 'docs-new', // Usually your repo name.
  clientModules: [require.resolve('./src/css/tailwind.css')],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          //path: 'docs/main',
          //id: 'default',
          //routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      },
    ],
  ],

  plugins: [
    tailwindPlugin,
    webpackPlugin,
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO: uncomment this to display search
      // algolia: {
      //   appId: 'GHXKYI4VEC', // public + read only and safe to commit
      //   apiKey: '89c79be3419cb93594c775fa808715ee', // public + read only and safe to commit
      //   indexName: 'prod_DOCS',
      //   contextualSearch: true,
      //   searchParameters: {},
      // },
      navbar: {
        logo: {
          alt: 'Macrometa Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-white.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'quickstart',
            position: 'left',
            label: 'Docs',
          },
          {
            position: 'left',
            label: 'API',
            href: '/api'
          },
          {
            href: 'https://github.com/macrometacorp/',
            label: 'GitHub',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quick Start',
                to: '/docs/quickstart',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/macrometa',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/macrometa',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/macrometacorp/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Macrometa`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;