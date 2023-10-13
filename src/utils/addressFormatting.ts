import { store } from 'redux/store';
export const getOriginalAddress = (address: string) => {
  if (!address) return '';
  return address.replace(/^ELF_/, '').replace(/_.*$/, '');
};

export const addPrefixSuffix = (str: string) => {
  if (!str) return str;
  let resStr = str;
  const prefix = 'ELF_';
  const suffix = `_${store.getState().configInfo.configInfo?.curChain}`;
  if (!str.startsWith(prefix)) {
    resStr = `${prefix}${resStr}`;
  }
  if (!str.endsWith(suffix)) {
    resStr = `${resStr}${suffix}`;
  }
  return resStr;
};
