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
    destination: 'https://test-hamster.beangotown.com/api/:path*',
  },
  {
    source: '/cms/:path*',
    destination: 'https://test-cms-hamster.beangotown.com/:path*',
  },
  {
    source: '/AElfIndexer_HamsterWoods/HamsterWoodsIndexerPluginSchema/graphql/:path*',
    destination: 'https://test.beangotown.com/AElfIndexer_HamsterWoods/HamsterWoodsIndexerPluginSchema/graphql/:path*',
  },
];
