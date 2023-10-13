import BigNumber from 'bignumber.js';

export const formatElfValue = (val?: number, decimals = 5) => {
  if (!val) return 0;

  return new BigNumber(val).dividedBy(10 ** 8).toFixed(decimals);
};
