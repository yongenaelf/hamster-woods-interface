import { IBeanPassClaimRes, IBeanPassClaimReq, IConfigResponse } from 'types';
import request, { cmsRequest } from './axios';

export const getBeanPassClaimClaimable = async (query: IBeanPassClaimReq): Promise<IBeanPassClaimRes> => {
  return request.get('app/bean-pass/claimable', { params: query });
};

export const receiveBeanPassNFT = async (body: IBeanPassClaimReq): Promise<IBeanPassClaimRes> => {
  return request.post('app/bean-pass/claim', body);
};

export const fetchConfigItems = async (): Promise<IConfigResponse> => {
  return cmsRequest.get<IConfigResponse>('items/config');
};

export const fetchChessboardData = async (): Promise<IConfigResponse> => {
  return cmsRequest.get<IConfigResponse>('items/chessboard_data');
};
