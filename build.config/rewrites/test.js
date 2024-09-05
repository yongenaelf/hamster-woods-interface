module.exports = [
  {
    source: '/connect/:path*',
    destination: 'https://auth-aa-portkey-test.portkey.finance/connect/:path*',
  },
  {
    source: '/portkey/:path*',
    destination: 'https://aa-portkey-test.portkey.finance/:path*',
  },
  {
    source: '/api/:path*',
    destination: 'https://hamster.beangotown.xyz/api/:path*',
  },
  {
    source: '/cms/:path*',
    destination: 'https://test-cms-hamster.beangotown.com/:path*',
  },
];
