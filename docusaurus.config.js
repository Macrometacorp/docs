// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/**
 * @type {import('redocusaurus').PresetEntry}
 */
const redocusaurus = [
    'redocusaurus',
    {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        specs: [
            {
                id: 'using-spec-swagger',
                spec: 'openapi.json',
                routePath: '/api',
            },
        ],
        theme: {
            /**
             * Highlight color for docs
             */
            primaryColor: '#1890ff',
            /**
             * Options to pass to redoc
             * @see https://github.com/redocly/redoc#redoc-options-object
             */
            redocOptions: { hideDownloadButton: false, disableSearch: false },
        },
    },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Macrometa',
  tagline: 'Macrometa GDN Documentation',
  url: 'https://macrometa.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Macrometacorp', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
		redocusaurus,
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/macrometacorp/documentation',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {

        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'quickstart',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/macrometacorp/documentation',
            label: 'GitHub',
            position: 'right',
          },
          {
            position: 'left',
            label: 'API',
            href: '/api'
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
                href: 'https://github.com/macrometacorp/documentation',
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
