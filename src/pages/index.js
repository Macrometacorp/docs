import React from 'react';
import { Redirect } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '@fontsource/source-code-pro'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'

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
      </Head>
      <Redirect to={`${siteConfig.baseUrl}quickstart`} />
    </>
  );
}
