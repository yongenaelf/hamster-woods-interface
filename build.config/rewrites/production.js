module.exports = [
  {
    source: '/connect/:path*',
    destination: 'https://auth-aa-portkey.portkey.finance/connect/:path*',
  },
  {
    source: '/portkey/:path*',
    destination: 'https://aa-portkey.portkey.finance/:path*',
  },
  {
    source: '/api/:path*',
    destination: 'https://hamster.beangotown.com/api/:path*',
  },
];
