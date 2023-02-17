import React from 'react';
import Head from '@docusaurus/Head';
import OriginalLayout from '@theme-original/Layout';
import '@fontsource/source-code-pro';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="preload" href="https://fonts.macrometa.com/averta/averta-cyrillic-regular.woff2" as="font" crossOrigin="true" />
        <link rel="preload" href="https://fonts.macrometa.com/averta/averta-cyrillic-semibold.woff2" as="font" crossOrigin="true" />
      </Head>
      <OriginalLayout {...props} />
    </>
  );
}
