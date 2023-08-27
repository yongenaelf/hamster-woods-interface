import type { Preview } from '@storybook/react';

import 'antd/dist/antd.css';
import '../src/styles/global.css';
import '../src/styles/theme.css';

import React, { useLayoutEffect } from 'react';

import { Provider } from 'react-redux';
import { rootReducer } from '../src/redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { setIsMobile } from '../src/redux/reducer/info';
import { useEffect } from 'react';

export const storybookStore = configureStore({
  reducer: rootReducer,
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  args: {
    isMobile: true,
  },
  decorators: [
    (Story, context) => {
      const { isMobile } = context.args;
      useEffect(() => {
        storybookStore.dispatch(setIsMobile(isMobile));
      }, [isMobile]);

      useLayoutEffect(() => {
        const event = 'onorientationchange' in window ? 'orientationchange' : 'resize';

        const fn = function () {
          const width = document.documentElement.clientWidth;
          const unitWidth = isMobile ? 390 : 1920;
          width && (document.documentElement.style.fontSize = width > 580 ? '16px' : 16 * (width / unitWidth) + 'px');
        };

        function initFontSize() {
          fn();
          window.addEventListener(event, fn, false);
          document.addEventListener('DOMContentLoaded', fn, false);
        }

        if (window && document) {
          initFontSize();
        }

        return () => {
          window.removeEventListener(event, fn, false);
          document.removeEventListener('DOMContentLoaded', fn, false);
        };
      }, [isMobile]);

      return (
        <Provider store={storybookStore}>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </Provider>
      );
    },
  ],
};

export default preview;
