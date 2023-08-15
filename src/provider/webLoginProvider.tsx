'use client';

import '@portkey/did-ui-react/dist/assets/index.css';
import 'aelf-web-login/dist/assets/index.css';
import { PortkeyProvider } from '@portkey/did-ui-react';
import { Network } from 'constants/platform';

export default ({ children }: { children: React.ReactNode }) => {
  return <PortkeyProvider networkType={Network}>{children}</PortkeyProvider>;
};
