import { request, RequestDocument } from 'graphql-request';

import { store } from 'redux/store';
import showMessage from 'utils/setGlobalComponentsInfo';

interface ErrorItem {
  message: string;
}

interface Error {
  status: number;
  errors: ErrorItem[];
}

function isError(err: unknown): err is Error {
  return (err as Error).status !== undefined && (err as Error).errors.length > 0;
}

export const graphQLRequest = async <T>(document: RequestDocument) => {
  try {
    return await request<T>(store.getState().configInfo.configInfo!.bingoGraphqlServer, document);
  } catch (err) {
    const response = (err as { response: unknown }).response;

    if (isError(response)) {
      // handle errors here
      switch (response.status) {
        case 400:
          showMessage.error('An error has occurred. Please try again later.');
          return;
        case 401:
          return;
        case 404:
          showMessage.error('Not found.');
          return;
        default:
          return;
      }
    }

    return;
  }
};
