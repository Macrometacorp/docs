// @ts-check
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
  baseUrl: isDev ? '/docs' : '/docs',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'macrometacorp',
  projectName: 'docs',
  clientModules: [
    require.resolve('./src/css/fonts.css'),
    require.resolve('./src/css/tailwind.css')
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          breadcrumbs: false,
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
      image: 'img/macrometa-preview-dark.png',
      metadata: [
        {
          name: 'og:title',
          content: 'Macrometa Docs'
        },
        {
          name: 'og:description',
          content: 'Powering the next generation of apps and APIs. Store, process, and serve data within milliseconds of everyone on the planet.'
        },
        {
          name: 'og:url',
          content: `${host}/docs/`
        },
        {
          name: 'og:image',
          content: `${host}/img/macrometa-preview-dark.png`
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
          src: 'img/macrometa-logo.svg',
          srcDark: 'img/macrometa-logo-dark.svg',
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
          // {
          //   href: '/',
          //   activeBasePath: '/',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            position: 'left',
            label: 'API Reference',
            href: '/api'
          },
          {
            className: 'navbar__item--external',
            href: 'https://support.macrometa.com/',
            label: 'Support',
            position: 'left',
          },
          {
            className: 'navbar__item--external',
            href: 'https://auth-play.macrometa.io/',
            label: 'Log in',
            position: 'left',
          },
          {
            className: 'navbar__item--external',
            href: 'https://github.com/macrometacorp/docs',
            label: 'GitHub',
            position: 'right',
          },
          {
            className: 'navbar__item--external',
            href: 'https://join.slack.com/t/macrometa/shared_invite/zt-1j4f06xwm-5Y~yGQz8CVImOowdc80s1A',
            label: 'Slack',
            position: 'right',
          },
          {
            className: 'navbar__item--external',
            href: 'https://twitter.com/macrometa',
            label: 'Twitter',
            position: 'right',
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
                label: 'Sample Apps',
                to: '/apps'
              },
              {
                label: 'Release Notes',
                to: '/release-notes'
              }
            ],
          },
          {
            title: 'Developer Tools',
            items: [
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://github.com/Macrometacorp/jsC8',
                label: 'Javascript',
              },
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://github.com/Macrometacorp/pyC8',
                label: 'Python',
              },
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://www.npmjs.com/package/gdnsl',
                label: 'CLI',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://github.com/macrometacorp',
                label: 'GitHub',
              },
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://join.slack.com/t/macrometa/shared_invite/zt-1j4f06xwm-5Y~yGQz8CVImOowdc80s1A',
                label: 'Slack',
              },
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://twitter.com/macrometa',
                label: 'Twitter',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://support.macrometa.com',
                label: 'Support',
              },
              {
                className: 'footer__link-item footer__item--external',
                href: 'https://status.macrometa.io/',
                label: 'System Status',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Macrometa • All rights reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
