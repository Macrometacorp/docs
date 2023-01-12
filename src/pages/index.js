import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout'; 
import { Redirect } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/* Components */
// import Card from '../components/Card';
// import Grid from '../components/Grid';

/* Styles */
// import styles from './index.module.css';

/* Fonts */
import '@fontsource/source-code-pro'

export default function Homepage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <Head>
        <meta title="Macrometa Docs" />
        <meta property="og:title" content="Macrometa Docs" />
        <meta property="og:url" content="https://www.macrometa.com/docs" />
        <meta property="og:image" content="https://www.macrometa.com/docs/assets/images/map.png" />
        <meta
          property="og:description"
          description="Powering the next generation of apps and APIs. Build performant apps on the edge with our lightning-fast, stateful serverless global data platform"
        />
        <link rel="canonical" href="https://www.macrometa.com/docs" />
        <link rel="preload" href="https://fonts.macrometa.com/averta/averta-cyrillic-regular.woff2" as="font" crossorigin />
        <link rel="preload" href="https://fonts.macrometa.com/averta/averta-cyrillic-semibold.woff2" as="font" crossorigin />
      </Head>
      <Redirect to={`${siteConfig.baseUrl}quickstart`} />

      {/* <div className={styles.heroBanner}>
        <h1>
          Documentation
        </h1>
        <h3>
          Everything you need to build lightning-fast, globally distributed apps and APIs
        </h3>
      </div>
      <div className="container">
        <Grid cols={3}>
          <Card heading="Global Data Mesh" href="/data" />
          <Card heading="Edge Compute" href="/compute" />
          <Card heading="Network" href="/network" />
          <Card heading="Access" href="/access" />
          <Card heading="Developer Tools" href="/development" />
          <Card heading="Sample Apps" href="/apps" />
        </Grid>
      </div> */}
    </Layout>
  );
}
