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
        <script>
          {
            `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T68NNDC');
            `
          }
        </script>
      </Head>
      <noscript>
          {
            `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T68NNDC"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `
          }
        </noscript>
      <OriginalLayout {...props} />
    </>
  );
}
