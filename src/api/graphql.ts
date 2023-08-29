import { request, RequestDocument } from 'graphql-request';
import { displayMessageOnce } from 'utils/displayMessageOnce';

import { store } from 'redux/store';

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
          displayMessageOnce('An error has occurred. Please try again later.', 'error');
          return;
        case 401:
          return;
        case 404:
          displayMessageOnce('Not found.', 'error');
          return;
        default:
          return;
      }
    }

    return;
  }
};
