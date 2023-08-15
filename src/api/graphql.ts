import { BEANGO_TOWN_GRAPHQL_URL } from 'constants/platform';
import { request, RequestDocument } from 'graphql-request';

export const graphQLRequest = <T>(document: RequestDocument) => request<T>(BEANGO_TOWN_GRAPHQL_URL, document);
