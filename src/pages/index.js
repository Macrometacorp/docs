import React from 'react';
import { Redirect } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '@fontsource/source-code-pro'

export default function Homepage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
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
      <Redirect to={`${siteConfig.baseUrl}quickstart`} />
    </>
  );
}
