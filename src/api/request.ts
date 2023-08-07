import request from './axios';
export const fetchConfig = async (): Promise<any> => {
  return request.get('app/config');
};
