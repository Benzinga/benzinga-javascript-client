import { WatchlistManager } from '@benzinga/watchlist-manager';
import { isTickerSelectedEvent, WidgetLinkingManager } from '@benzinga/widget-linking';
import {
  FieldId,
  ScreenerFieldType,
  ScreenerFilterOperator,
  ScreenerStringOperator,
  SignalsEndpointParams,
  SignalsScreenerFilter,
  SignalType,
} from './entities';

const isBlank = (value: string | null) => (value ?? '') === '';

const makeFilterString =
  (fieldId: FieldId) =>
  (operator: ScreenerFilterOperator, parameter: string | number | null): string => {
    return `${fieldId}_${operator}_${parameter}`;
  };

export const screenerFiltersToScreenerQuery = (
  screenerFilters: SignalsScreenerFilter[],
  watchlistManager: WatchlistManager,
  linkingManager: WidgetLinkingManager,
): string => {
  let symbols: string[] = [];

  return screenerFilters
    .reduce<string[]>((accumulator, filter) => {
      const filterString = makeFilterString(filter.fieldId);

      switch (filter.type) {
        case ScreenerFieldType.range: {
          const left = filter.parameter[0];
          const right = filter.parameter[1];
          if (left === null && right === null) {
            return accumulator;
          }

          if (!isBlank(left) && isBlank(right)) {
            return [...accumulator, filterString(ScreenerFilterOperator.greaterThan, left)];
          } else if (isBlank(left) && !isBlank(right)) {
            return [...accumulator, filterString(ScreenerFilterOperator.lessThan, right)];
          } else if (!isBlank(left) && !isBlank(right)) {
            return [
              ...accumulator,
              filterString(ScreenerFilterOperator.greaterThan, left),
              filterString(ScreenerFilterOperator.lessThan, right),
            ];
          } else {
            return accumulator;
          }
        }

        case ScreenerFieldType.string: {
          if (filter.parameter === null) {
            return accumulator;
          }

          switch (filter.operator) {
            case ScreenerStringOperator.startsWith:
              return [...accumulator, filterString(ScreenerFilterOperator.regex, `${filter.parameter}.*`)];

            case ScreenerStringOperator.endsWith:
              return [...accumulator, filterString(ScreenerFilterOperator.regex, `.*${filter.parameter}`)];

            case ScreenerStringOperator.equals:
              return [...accumulator, filterString(ScreenerFilterOperator.equals, filter.parameter)];

            case ScreenerStringOperator.contains:
              return [...accumulator, filterString(ScreenerFilterOperator.regex, `.*${filter.parameter}.*`)];

            default:
              return accumulator;
          }
        }

        case ScreenerFieldType.multiselect: {
          if (filter.parameter === null) {
            return accumulator;
          }

          const parameterString = filter.parameter ? filter.parameter.map(item => item.optionId).join(',') : null;
          return [...accumulator, filterString(ScreenerFilterOperator.includes, parameterString)];
        }

        // since the query parameter for both these is `symbol_in_${tickers}`, their combined symbols need to be returned as 1 string
        case ScreenerFieldType.symbol:
        case ScreenerFieldType.watchlist:
        case ScreenerFieldType.link: {
          if ((filter.parameter?.length ?? 0) === 0 || !filter.parameter) {
            return accumulator;
          }

          if (filter.type === ScreenerFieldType.watchlist) {
            const wlSymbols = filter.parameter.flatMap(wlItem => {
              const wl = watchlistManager.getStoredWatchlistById(wlItem.watchlistId);
              return wl ? [wl.symbols.map(sym => sym.symbol)] : [];
            });
            const flattenedSymbols = [...new Set(wlSymbols.flat())];
            symbols = [...new Set(flattenedSymbols.concat(symbols))];
          }

          if (filter.type === ScreenerFieldType.link) {
            const linkSymbols = filter.parameter.flatMap(linkId => {
              const link = linkingManager.getWidgetLinkFeedByID(linkId)?.getLink();
              const symbol = link && link.events.find(isTickerSelectedEvent)?.symbol;
              return symbol ? [symbol] : [];
            });
            symbols = [...new Set(linkSymbols.concat(symbols))];
          }

          if (filter.type === ScreenerFieldType.symbol) {
            symbols = [...new Set(filter.parameter.concat(symbols))];
          }

          const parameterString = symbols.join(',');

          return [
            ...accumulator.filter(item => !item.startsWith('symbol')),
            makeFilterString('symbol')(ScreenerFilterOperator.includes, parameterString),
          ];
        }

        default:
          return accumulator;
      }
    }, [])
    .join(';');
};

export const generateSignalsParams = (
  selectedSignalTypes: SignalType[],
  screenerFilters: SignalsScreenerFilter[],
  watchlistManager: WatchlistManager,
  linkingManager: WidgetLinkingManager,
): SignalsEndpointParams => {
  const screenerQuery = screenerFiltersToScreenerQuery(screenerFilters, watchlistManager, linkingManager);

  const filter = JSON.stringify([
    {
      operator: 'in',
      property: 'type',
      value: selectedSignalTypes,
    },
  ]);

  return {
    filter,
    limit: 100,
    start: 0,
    ...(screenerQuery ? { screenerQuery } : {}),
  };
};
