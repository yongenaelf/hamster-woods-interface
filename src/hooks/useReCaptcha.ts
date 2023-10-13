import { useState, useCallback, useEffect } from 'react';
import { BaseReCaptcha } from '@portkey/did-ui-react';
import { ConfigProvider } from '@portkey/did-ui-react';
import { eventBus } from 'utils/lib';
import { SET_RECAPTCHA_CONFIG } from '../constants/events';

const useReCaptcha = () => {
  const [reCaptchaInfo, setReCaptchaInfo] = useState<Partial<BaseReCaptcha> | undefined>(
    ConfigProvider.config?.reCaptchaConfig,
  );
  const setHandler = useCallback((reCaptchaInfo: Partial<BaseReCaptcha>) => {
    setReCaptchaInfo((v) => ({ ...v, ...reCaptchaInfo }));
  }, []);

  useEffect(() => {
    eventBus.addListener(SET_RECAPTCHA_CONFIG, setHandler);
    return () => {
      eventBus.removeListener(SET_RECAPTCHA_CONFIG, setHandler);
    };
  }, [setHandler]);

  return reCaptchaInfo;
};

export default useReCaptcha;
