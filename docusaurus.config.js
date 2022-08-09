// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();

const {
  redirectsPlugin,
  tailwindPlugin,
  webpackPlugin,
} = require('./src/plugins');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const host = process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? `https://${process.env.VERCEL_URL}` : 'https://macrometa.com';
const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Macrometa',
  tagline: 'Macrometa GDN Documentation',
  url: host,
  baseUrl: isDev ? '/' : '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
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
        gtag: {
          trackingID: process.env.GTAG_TRACKING_ID || "DEV",
        },
      },
    ],
  ],

  plugins: [
    redirectsPlugin,
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
          content: `${host}/docs/`
        },
        {
          name: 'og:image',
          content: 'https://assets-global.website-files.com/5fa9e94bc848ae335afdd627/601af89de27f422a1c090b14_mm-map.png'
        }
      ],
      algolia: {
        appId: 'GHXKYI4VEC', // public + read only and safe to commit
        apiKey: '91737ee0cdeab53f4cc7a1c650eee730', // public + read only and safe to commit
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
                label: 'What is Macrometa',
                to: '/what-is-macrometa',
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
