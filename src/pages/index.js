import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '@fontsource/source-code-pro'

export default function Homepage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout>
      <Head>
        <meta title="Macrometa Docs" />
        <meta property="og:title" content="Macrometa Docs" />
        <meta property="og:url" content="https://macrometa.com/docs" />
        <meta property="og:image" content="https://macrometa.com/docs/assets/images/map.png" />
        <meta
          property="og:description"
          description="Powering the next generation of apps and APIs. Build performant apps on the edge with our lightning-fast, stateful serverless global data platform"
        />
        <link rel="canonical" href="https://macrometa.com/docs" />
        <link rel="preload" href="https://fonts.macrometa.com/averta/averta-cyrillic-regular.woff2" as="font" crossorigin />
        <link rel="preload" href="https://fonts.macrometa.com/averta/averta-cyrillic-semibold.woff2" as="font" crossorigin />
      </Head>

      <h1>
        Documentation
      </h1>
      <Link to="/data">Global Data Mesh</Link>
      <Link to="/compute">Edge Compute</Link>
      <Link to="/network">Network</Link>
      <Link to="/access">Access</Link>
    </Layout>
  );
}
