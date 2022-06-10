// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();

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
  baseUrl: isDev ? '/' : '/docs/',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'error',
  favicon: 'img/favicon.ico',
  organizationName: 'macrometacorp', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  clientModules: [require.resolve('./src/css/tailwind.css')],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          editUrl: ({ docPath }) =>
            `https://github.com/macrometacorp/docs/edit/master/docs/${docPath}`,
          routeBasePath: '/',
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
    'posthog-docusaurus'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/map.png',
      metadata: [
        {
          name: 'og:title',
          content: 'Macrometa Docs'
        },
        {
          name: 'og:description',
          content: 'Powering the next generation of apps and APIs. Build performant apps on the edge with our lightning-fast, stateful serverless global data platform'
        },
        {
          name: 'og:url',
          content: 'https://macrometa.com/docs/'
        },
        {
          name: 'og:image',
          content: 'https://assets-global.website-files.com/5fa9e94bc848ae335afdd627/601af89de27f422a1c090b14_mm-map.png'
        }
      ],
      algolia: {
        appId: 'GHXKYI4VEC', // public + read only and safe to commit
        apiKey: '89c79be3419cb93594c775fa808715ee', // public + read only and safe to commit
        indexName: 'prod_DOCS',
        contextualSearch: true,
        searchParameters: {},
      },
      posthog: {
        apiKey: process.env.POSTHOG_API_KEY || "DEV",
        appUrl: process.env.POSTHOG_API_URL || "https://posthog.prod.macrometa.io",
        enableInDevelopment: false
      },
      navbar: {
        logo: {
          alt: 'Macrometa Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo-white.svg',
          href: 'https://macrometa.com',
          target: '_self'
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
            href: 'https://github.com/macrometacorp/docs',
            label: 'GitHub',
            position: 'left',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quickstart',
                to: '/quickstart',
              },
              {
                label: 'Essentials',
                to: '/essentials/index',
              }
            ],
          },
          {
            title: 'SDKs & Tools',
            items: [
              {
                label: 'Javascript',
                href: 'https://github.com/Macrometacorp/jsC8',
              },
              {
                label: 'Python',
                href: 'https://github.com/Macrometacorp/pyC8',
              },
              {
                label: 'CLI',
                href: 'https://www.npmjs.com/package/gdnsl',
              },
            ],
          },
          {
            title: 'Community',
            items: [
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
