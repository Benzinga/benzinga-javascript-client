import { DataRequestInit } from '@benzinga/session';
import { CommonCalendarQueryParams } from './entities';

export interface CommonCalendarRequestOptions<E> {
  credentials?: DataRequestInit['credentials'];
  formatResponse?: (data: unknown) => E[];
  genUrlParams?: (params: CommonCalendarQueryParams) => any;
}
