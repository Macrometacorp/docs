// @ts-check
require("dotenv").config();

const { tailwindPlugin, webpackPlugin } = require("./src/plugins");

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const host =
  process.env.VERCEL_ENV && process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.macrometa.com";
const isDev =
  process.env.NODE_ENV === "development" ||
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV === "preview");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Macrometa",
  tagline: "Macrometa GDN Documentation",
  url: host,
  baseUrl: isDev ? "/docs/" : "/docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "macrometacorp",
  projectName: "docs",
  clientModules: [
    require.resolve("./src/css/fonts.css"),
    require.resolve("./src/css/tailwind.css"),
  ],
  customFields: {
    VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          breadcrumbs: false,
          editUrl: ({ docPath }) =>
            `https://github.com/macrometacorp/docs/edit/main/docs/${docPath}`,
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
        },
        blog: false,
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
        gtag: {
          trackingID: process.env.GTAG_TRACKING_ID || "DEV",
        },
      },
    ],
  ],

  plugins: [tailwindPlugin, webpackPlugin, "posthog-docusaurus"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/macrometa-preview-dark.png",
      metadata: [],
      algolia: {
        appId: "GHXKYI4VEC", // public + read only and safe to commit
        apiKey: "91737ee0cdeab53f4cc7a1c650eee730", // public + read only and safe to commit
        indexName: "prod_DOCS",
        contextualSearch: true,
        searchParameters: {},
      },
      posthog: {
        apiKey: process.env.POSTHOG_API_KEY || "DEV",
        appUrl:
          process.env.POSTHOG_API_URL || "https://posthog.prod.macrometa.io",
        enableInDevelopment: false,
      },
      navbar: {
        logo: {
          alt: "Macrometa Logo",
          src: "img/macrometa-logo.svg",
          srcDark: "img/macrometa-logo-dark.svg",
          href: "http://macrometa.com/",
          target: "_self",
        },
        items: [
          // {
          //   href: '/',
          //   activeBasePath: '/',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            type: "dropdown",
            label: "Products",
            items: [
              {
                label: "PhotonIQ",
                href: "/photoniq",
              },
              {
                type: "doc",
                docId: "gdn",
                label: "GDN",
              },
            ],
          },
          {
            label: "Developer Tools",
            href: "/development",
          },
          {
            className: "navbar__item--external",
            href: "https://www.macrometa.com/support",
            label: "Support",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "PhotonIQ",
                to: "/photoniq",
              },
              {
                label: "GDN",
                to: "/gdn",
              },
              {
                label: "Release Notes",
                to: "/release-notes",
              },
            ],
          },
          {
            title: "Developer Tools",
            items: [
              {
                href: "/api",
                label: "API",
              },
              {
                href: "/sdks",
                label: "SDK",
              },
            ],
          },
            {
            title: "Resources",
            items: [
              {
                href: "/tutorials",
                label: "Tutorials",
              },
              {
                className: "footer__link-item footer__item--external",
                href: "https://www.macrometa.com/blog",
                label: "Blog",
              },
              {
                className: "footer__link-item footer__item--external",
                href: "https://www.macrometa.com/support",
                label: "Support",
              },
              // {
              //   href: '/tutorials',
              //   label: 'FAQ'
              // },
              {
                className: "footer__link-item footer__item--external",
                href: "https://status.macrometa.io/",
                label: "System Status",
              },
            ],
          },
          {
            title: "Company",
            items: [
              {
                className: "footer__link-item footer__item--external",
                href: "https://www.macrometa.com/about",
                label: "About",
              },
              {
                className: "footer__link-item footer__item--external",
                href: "https://www.macrometa.com/terms-of-service",
                label: "Terms of Service",
              },
              {
                className: "footer__link-item footer__item--external",
                href: "https://www.macrometa.com/privacy-policy",
                label: "Privacy Policy",
              },
              {
                className: "footer__link-item footer__item--external",
                href: "https://www.macrometa.com/contact",
                label: "Contacts Us",
              },
            ],
          },
          {
            title: "Join the newsletter",
            items: [
              {
                html: `
                <div class="newsletter">
                <form class="signup">
                  <input type="email" id="email" name="email" placeholder="Email Address">
                  <button type="submit">Subscribe</button>
                </form>
              </div>
                `,
              },
              {
                html: `
                  <a href="https://github.com/macrometacorp" target="_blank">
                  <img class="social-icons" src="/docs/img/Icon-github.svg">
                  </a>
                  <a href="https://facebook.com/MacrometaCorp" target="_blank">
                  <img class="social-icons" src="/docs/img/Icon-facebook.svg">
                  </a>
                  <a href="https://twitter.com/macrometa" target="_blank">
                  <img class="social-icons" src="/docs/img/Icon-twitter.svg">
                  </a>
                  <a href="https://linkedin.com/company/macrometa-corporation" target="_blank">
                  <img class="social-icons" src="/docs/img/Icon-linkedin.svg">
                  </a>
                `,
              },
            ],
          },
        ],
        copyright: `<div> © ${new Date().getFullYear()} Macrometa • All rights reserved <div>`,
      },
    
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["rust", "bash", "powershell", "toml"],
      },
    }),
};

module.exports = config;
