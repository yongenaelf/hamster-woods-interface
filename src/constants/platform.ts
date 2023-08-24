import { SupportedELFChainId } from 'types';

export const Network = 'MAIN';
export const ChainId = SupportedELFChainId.TDVW_NET;
export const portKeyExtensionUrl =
  'https://chrome.google.com/webstore/detail/portkey-did-crypto-nft/hpjiiechbbhefmpggegmahejiiphbmij';

export const portkeyDidUIPrefix = '@portkey/did-ui-sdk:';

export const LOGIN_EARGLY_KEY = 'discover.loginEargly';

export const KEY_NAME = 'BEANGOTOWN';

export const BEANGO_TOWN_GRAPHQL_URL = '/AElfIndexer_BeangoTown/BeangoTownIndexerPluginSchema/graphql';

export const MAX_LEADERBOARD_ITEMS = 100;
export const MAX_GAME_RECORD_ITEMS = 150;

export const EXPLORER_BASE_URL = window.location.hostname.includes('beangotown.com')
  ? 'tdvv-explorer.aelf.io'
  : 'explorer-test-side02.aelf.io';
