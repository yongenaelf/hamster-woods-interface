import BigNumber from 'bignumber.js';

export const ZERO = new BigNumber(0);

export const isEffectiveNumber = (v: any) => {
  const val = new BigNumber(v);
  return !val.isNaN() && !val.lte(0);
};

export function timesDecimals(a?: BigNumber.Value, decimals: string | number = 18) {
  if (!a) return new BigNumber(0);
  const bigA = BigNumber.isBigNumber(a) ? a : new BigNumber(a);
  if (bigA.isNaN() || isNaN(Number(decimals))) return new BigNumber(0);
  if (typeof decimals === 'string' && decimals.length > 10) {
    return bigA.times(decimals);
  }
  return bigA.times(`1e${decimals}`);
}

export function divDecimals(a?: BigNumber.Value, decimals: string | number = 18) {
  if (!a) return ZERO;
  const bigA = ZERO.plus(a);
  if (bigA.isNaN()) return ZERO;
  if (typeof decimals === 'string' && decimals.length > 10) return bigA.div(decimals);
  return bigA.div(`1e${decimals}`);
}

export function divDecimalsStr(a?: BigNumber.Value, decimals: string | number = 8, defaultVal = '0') {
  const n = divDecimals(a, decimals);
  return isEffectiveNumber(n) ? n.toFixed() : defaultVal;
}

export function divDecimalsStrShow(a?: BigNumber.Value, decimals: string | number = 8, defaultVal = '0') {
  const n = divDecimals(a, decimals);
  return isEffectiveNumber(n) ? n.toFormat() : defaultVal;
}

export const formatAmountUSDShow = (
  count: number | BigNumber | string | null | undefined,
  decimal: string | number = 4,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN,
) => {
  if (count === undefined || count === null || count === '') return '';

  const min = divDecimals(1, decimal);
  const bigCount = BigNumber.isBigNumber(count) ? count : new BigNumber(count || '');
  if (bigCount.isNaN() || bigCount.eq(0)) return '$0';
  if (min.gt(bigCount)) return `<$ ${min.toFixed()}`;
  return '$' + bigCount.decimalPlaces(typeof decimal !== 'number' ? Number(decimal) : decimal, roundingMode).toFormat();
};
