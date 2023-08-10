import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectInfo } from 'redux/reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';

export default function useLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLock, setIsLock] = useState(false);

  const { loginStatus } = useSelector(selectInfo);

  useEffect(() => {
    setIsLogin(loginStatus === LoginStatus.LOGGED);
    setIsLock(loginStatus === LoginStatus.LOCK);
  }, [loginStatus]);

  return {
    isLogin,
    isLock,
  };
}
