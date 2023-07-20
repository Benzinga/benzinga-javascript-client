import { CommonCalendarQueryParams } from './entities';

export const genUrlParams = (params: CommonCalendarQueryParams) => {
  const { dateFrom, dateTo, display, fields, importance, page, pageSize, symbols, ...additionalParams } = params;

  return {
    fields: fields,
    page: page,
    pagesize: pageSize,
    parameters: {
      ...(dateFrom && { date_from: dateFrom }),
      ...(dateTo && { date_to: dateTo }),
      ...(display && { display: display }),
      ...(importance && { importance: importance }),
      ...(symbols && { tickers: symbols.join(',') }),
      ...additionalParams,
    },
  };
};
