import 'styles/base.css';

import Script from 'next/script';

import 'antd/dist/antd.css';
import Provider from 'provider';

import 'styles/global.css';
import 'styles/theme.css';
import Layout from 'pageComponents/layout';

export const metadata = {
  title: 'Hamster Woods',
  description: 'Hop and earn token/NFT rewards!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <Script strategy="afterInteractive" id="rem-px" />
        <Script strategy="afterInteractive" src="/telegram-web-app.js" />
      </head>
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
