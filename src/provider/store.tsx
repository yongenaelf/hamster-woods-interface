'use client';

import { store } from 'redux/store';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
