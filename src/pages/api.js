import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function APIPage() {
  return (
    <Layout>
      <Head>
        <title>API Reference | Macrometa Docs</title>
        <meta name="description" content="Macrometa REST API" />
        <meta name="og:description" content="Macrometa REST API" />
        {/* Loading styles for elements this way so it doesn't interfere with other styles */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/@stoplight/elements/styles.min.css"
        />
      </Head>
      <BrowserOnly
        fallback={
          <div className="flex min-h-screen w-full items-center justify-center">
            <div
              className="h-10 w-10 animate-spin rounded-full border-l border-t-2 border-primary"
              aria-label="Loading..."
            ></div>
          </div>
        }
      >
        {() => {
          // eslint-disable-next-line no-undef
          const { API } = require('@stoplight/elements');
          return (
            <>
              {/* https://api-gdn.paas.macrometa.io/_admin/api/swagger.json */}
              <API
                apiDescriptionUrl="/docs-new/swagger.json"
                router="hash"
                basePath="/"
                layout="sidebar"
                hideMocking
                hideInternal
              />
            </>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}