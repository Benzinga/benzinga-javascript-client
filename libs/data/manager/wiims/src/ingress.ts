import { Wiim, WiimSecurity } from './entities';

export interface IngressWiimsResponse {
  wiims: IngressWiim[];
}

export interface IngressWiim {
  id: string;
  description?: string;
  search_key?: string;
  security: WiimSecurity;
  created: number;
  updated: number;
  expired: number;
}

export function ingressWiimResponse(response: IngressWiimsResponse): Wiim[] {
  console.log(response);

  return response.wiims.map(w => {
    return {
      ...w,
      searchKey: w.search_key,
    };
  });
}
