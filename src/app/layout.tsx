import Script from 'next/script';

import Layout from 'pageComponents/layout';

import 'antd/dist/antd.css';

import 'styles/global.css';
import 'styles/theme.css';

import Provider from 'provider/';

export const metadata = {
  title: 'Forest',
  description: 'Forest',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <Script strategy="afterInteractive" id="rem-px">{`
        (function () {
            function initFontSize(doc, win) {
                var docEle = doc.documentElement;
                var event = 'onorientationchange' in window ? 'orientationchange' : 'resize';
                var fn = function () {
                  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  var width = docEle.clientWidth;
                  var unitWidth = isMobile ? 390 : 1920;
                  width && (docEle.style.fontSize = width > 580 ? '16px' : 16 * (width / unitWidth) + 'px');
                };
                fn();
                win.addEventListener(event, fn, false);
                doc.addEventListener('DOMContentLoaded', fn, false);
            }

            if (window && document) {
              initFontSize(document, window);
            }
        })();
      `}</Script>
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
