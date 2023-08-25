import type { Preview } from '@storybook/react';
import '../src/styles/global.css';
import React from 'react';

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
