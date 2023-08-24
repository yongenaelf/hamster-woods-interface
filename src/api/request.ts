import { IBeanPassClaimRes, IBeanPassClaimReq } from 'types';
import request from './axios';

export const getBeanPassClaimClaimable = async (query: IBeanPassClaimReq): Promise<IBeanPassClaimRes> => {
  return request.get('api/app/bean-pass/claimable', { params: query });
};

export const receiveBeanPassNFT = async (body: IBeanPassClaimReq): Promise<IBeanPassClaimRes> => {
  return request.post('api/app/bean-pass/claim', body);
};
