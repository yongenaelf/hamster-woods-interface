const apiEnv = process.env.NEXT_PUBLIC_APP_ENV;

const testApi = {
  webApi: 'http://192.168.66.225:5006',
  portkeyApi: 'https://localtest-applesign2.portkey.finance',
  portkeyAuthApi: 'https://auth-portkey-test.portkey.finance',
};

const mainNetApi = {
  webApi: 'http://192.168.66.225:5006',
  portkeyApi: 'https://localtest-applesign2.portkey.finance',
  portkeyAuthApi: 'https://auth-portkey-test.portkey.finance',
};

if (apiEnv === 'development') {
  module.exports = testApi;
} else {
  module.exports = mainNetApi;
}
