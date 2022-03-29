import React from 'react';
import { Redirect } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Homepage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Head>
        <meta title="Macrometa Docs" />
        <meta property="og:title" content="Macrometa Docs" />
        <meta
          property="og:description"
          description="Description will go here"
        />
        <meta
          property="description"
          content="Description will go here"
        />
        <link rel="canonical" href="https://macrometa.com/docs" />
      </Head>
      <Redirect to={`${siteConfig.baseUrl}docs/quickstart`} />
    </>
  );
}
