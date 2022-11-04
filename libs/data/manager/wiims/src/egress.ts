import { WiimsRequestParams } from './request';

export interface EgressWiimRequestParams {
  country?: string;
  page?: number;
  pagesize?: number;
  search_keys?: string;
  search_keys_type?: string;
  updated_since?: number;
}

export function egressWiimRequestParams(params: WiimsRequestParams): EgressWiimRequestParams {
  return {
    country: params.country,
    page: params.page,
    pagesize: params.pagesize,
    search_keys: params.searchKeys,
    search_keys_type: params.searchKeysType,
    updated_since: params.updatedSince,
  };
}
