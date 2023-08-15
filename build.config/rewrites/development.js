module.exports = [
  {
    source: '/connect/:path*',
    destination: 'https://did-portkey-test.portkey.finance/connect/:path*',
  },
  {
    source: '/portkey/:path*',
    destination: 'https://localtest-applesign2.portkey.finance/:path*',
  },
  {
    source: '/api/:path*',
    destination: 'http://192.168.66.225:5006/api/:path*',
  },
  {
    source: '/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
    destination: 'http://192.168.67.51:8083/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
  },
  {
    source: '/AElfIndexer_BeangoTown/BeangoTownIndexerPluginSchema/:path*',
    destination: 'http://192.168.66.159:8095/AElfIndexer_BeangoTown/BeangoTownIndexerPluginSchema/:path*',
  },
];
