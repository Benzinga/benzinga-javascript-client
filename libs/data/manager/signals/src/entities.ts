import { ISO8601, Params, StockSymbol } from '@benzinga/session';
import { AutocompleteItem } from '@benzinga/autocomplete-manager';

export enum SignalsMessageType {
  authReq = 'AuthRequest',
  authRes = 'AuthResponse',
  feedRequest = 'FeedRequest',
  heartbeat = 'Heartbeat',
  signal = 'Signal',
}

export type ScreenerQueryString = string;

export interface SignalsFeedRequestMessage {
  id: number | null;
  payload: {
    screenerQuery: ScreenerQueryString;
    signalFilters: string[];
  };
  type: SignalsMessageType.feedRequest;
}

export interface SignalsHeartbeatMessage {
  id: number | null;
  payload: {
    time: number;
  };
  type: SignalsMessageType.heartbeat;
}

export interface SignalsSignalMessage {
  payload: Signal;
  type: SignalsMessageType.signal;
}

export interface SignalsAuthMessage {
  id: number;
  payload: {
    sessionId: string;
  };
  type: SignalsMessageType.authReq;
}

export interface SignalsAuthSuccessResponse {
  id: number;
  payload: {
    success: boolean;
  };
  type: SignalsMessageType.authRes;
}

export type SignalsResponse = SignalsAuthSuccessResponse | SignalsHeartbeatMessage | SignalsSignalMessage;

export enum SignalType {
  blockTrade = 'BLOCK_TRADE',
  dayHighSeries = 'DAY_HIGH_SERIES',
  dayLowSeries = 'DAY_LOW_SERIES',
  fiftyTwoWeekHigh = 'FTW_HIGH',
  fiftyTwoWeekLow = 'FTW_LOW',
  gap = 'GAP',
  haultResume = 'HALT_RESUME',
  high = 'NEW_HIGH',
  low = 'NEW_LOW',
  option = 'OPTION_ACTIVITY',
  spike_up = 'PRICE_SPIKE_UP',
  spike_down = 'PRICE_SPIKE_DOWN',
}

// Add SignalTypes here to add support for more upsell features
export const signalTypeToFeature = {
  [SignalType.option]: {
    action: 'bzpro/feature/use',
    resource: 'signals-options',
  },
};

interface BaseSignal {
  date: ISO8601;
  description: string;
  id: number;
  key: number;
  symbol: StockSymbol;
  type: SignalType;
}

export interface SpikeUPSignal extends BaseSignal {
  properties: {
    amount: string;
    percent: string; // in integer form, not fraction. e.g. 2.5 not 0.025
  };
  type: SignalType.spike_up;
}

export interface SpikeDOWNSignal extends BaseSignal {
  properties: {
    amount: string;
    percent: string; // in integer form, not fraction. e.g. 2.5 not 0.025
  };
  type: SignalType.spike_down;
}

export interface BlockTradeSignal extends BaseSignal {
  properties: {
    ask: string;
    bid: string;
    exchange: string;
    price: string;
    saleConditions: string;
    size: string;
  };
  type: SignalType.blockTrade;
}

export interface OptionActivitySignal extends BaseSignal {
  properties: {
    aggressorInd: string;
    costBasis: string;
    optionActivityType: 'SWEEP' | 'TRADE';
    sentiment: string;
  };
  type: SignalType.option;
}

export interface GapSignal extends BaseSignal {
  type: SignalType.gap;
}
export interface HaultResumeSignal extends BaseSignal {
  type: SignalType.haultResume;
}
export interface HighSignal extends BaseSignal {
  type: SignalType.high;
}
export interface LowSignal extends BaseSignal {
  type: SignalType.low;
}
export interface FiftyTwoWeekHighSignal extends BaseSignal {
  type: SignalType.fiftyTwoWeekHigh;
}
export interface FiftyTwoWeekLowSignal extends BaseSignal {
  type: SignalType.fiftyTwoWeekLow;
}
export interface DayHighSeriesSignal extends BaseSignal {
  type: SignalType.dayHighSeries;
}
export interface DayLowSeriesSignal extends BaseSignal {
  type: SignalType.dayLowSeries;
}

export type Signal =
  | BlockTradeSignal
  | DayHighSeriesSignal
  | DayLowSeriesSignal
  | FiftyTwoWeekHighSignal
  | FiftyTwoWeekLowSignal
  | GapSignal
  | HaultResumeSignal
  | HighSignal
  | LowSignal
  | OptionActivitySignal
  | SpikeUPSignal
  | SpikeDOWNSignal;

export enum SignalGroup {
  highs = 'highs',
  lows = 'lows',
  price_spike = 'price_spike',
}

export interface SignalGroupConfig {
  hue: number;
  label: string;
  type: SignalGroup;
}

export type SignalGroupConfigsById = {
  [signalGroup in SignalGroup]: SignalGroupConfig;
};

export interface SignalConfig {
  group?: SignalGroup;
  hue: number;
  label: string;
  type: SignalType;
  signal?: string;
}

/********************
 * SIGNALS SCREENER *
 ********************/

export enum ScreenerFieldType {
  link = 'link',
  multiselect = 'multipleselect',
  range = 'range',
  string = 'stringinput',
  symbol = 'symbol',
  watchlist = 'watchlist',
}

export type ScreenerField = MultiselectField | RangeField | StringField | SymbolField | WatchlistField;

export type SignalsScreenerFilter = SignalsScreenerFilterV2;

export type SignalsScreenerFilterV2 =
  | ScreenerMultiselectFilter
  | ScreenerRangeFilter
  | ScreenerStringFilter
  | ScreenerSymbolFilterV2
  | ScreenerWatchlistFilterV2
  | ScreenerLinkFilter;

export type SignalsScreenerFilterV1 =
  | ScreenerMultiselectFilter
  | ScreenerRangeFilter
  | ScreenerStringFilter
  | ScreenerSymbolFilterV1
  | ScreenerWatchlistFilterV1;

export interface ScreenerStringFilter {
  fieldId: FieldId;
  operator: ScreenerStringOperator;
  parameter: ScreenerStringParameter;
  type: ScreenerFieldType.string;
}

export interface ScreenerRangeFilter {
  fieldId: FieldId;
  operator: ScreenerRangeOperator;
  parameter: ScreenerRangeParameter;
  type: ScreenerFieldType.range;
}

export interface ScreenerMultiselectFilter {
  fieldId: FieldId;
  operator: ScreenerMultiselectOperator;
  parameter: ScreenerMultiselectParameter;
  type: ScreenerFieldType.multiselect;
}

export interface ScreenerLinkFilter {
  fieldId: FieldId;
  operator: ScreenerSymbolOperator;
  parameter: ScreenerLinkParameter;
  type: ScreenerFieldType.link;
}

export type ScreenerSymbolFilter = ScreenerSymbolFilterV2;
export interface ScreenerSymbolFilterV2 {
  fieldId: FieldId;
  operator: ScreenerSymbolOperator;
  parameter: ScreenerSymbolParameterV2;
  type: ScreenerFieldType.symbol;
}
export interface ScreenerSymbolFilterV1 {
  fieldId: FieldId;
  operator: ScreenerSymbolOperator;
  parameter: ScreenerSymbolParameterV1;
  type: ScreenerFieldType.symbol;
}

export type ScreenerWatchlistFilter = ScreenerWatchlistFilterV2;

export interface ScreenerWatchlistFilterV2 {
  fieldId: FieldId;
  operator: ScreenerWatchlistOperator;
  parameter: ScreenerWatchlistParameterV2;
  type: ScreenerFieldType.watchlist;
}

export interface ScreenerWatchlistFilterV1 {
  fieldId: FieldId;
  operator: ScreenerWatchlistOperator;
  parameter: ScreenerWatchlistParameterV1;
  type: ScreenerFieldType.watchlist;
}

export enum ScreenerFieldCategory {
  assetClassification = 'assetClassification',
  fundamental = 'fundamental',
  price = 'price',
  reference = 'reference',
  valuation = 'valuation',
}

export enum ScreenerFilterOperator {
  between = 'bt',
  equals = 'eq',
  greaterThan = 'gt',
  includes = 'in',
  lessThan = 'lt',
  regex = 're',
}

export interface BaseScreenerField {
  category: ScreenerFieldCategory;
  fieldId: FieldId;
  label: string;
}

export enum ScreenerStringOperator {
  contains = 'contains',
  endsWith = 'endsWith',
  equals = 'equals',
  startsWith = 'startsWith',
}
export type ScreenerStringParameter = string | null;
export interface StringField extends BaseScreenerField {
  defaultOperator: ScreenerStringOperator;
  defaultParameter: ScreenerStringParameter;
  type: ScreenerFieldType.string;
}

export type ScreenerMultiselectParameter = ScreenerMultiselectOption[] | null;
export type ScreenerMultiselectOperator = ScreenerFilterOperator.includes;
export interface MultiselectField extends BaseScreenerField {
  defaultOperator: ScreenerMultiselectOperator;
  defaultParameter: ScreenerMultiselectParameter;
  options: ScreenerMultiselectOption[];
  type: ScreenerFieldType.multiselect;
}

export interface ScreenerMultiselectOption {
  label: string;
  optionId: string;
}

export type ScreenerRangeParameter = [string | null, string | null];
export type ScreenerRangeOperator = ScreenerFilterOperator.between;
export interface RangeField extends BaseScreenerField {
  defaultOperator: ScreenerRangeOperator;
  defaultParameter: ScreenerRangeParameter;
  type: ScreenerFieldType.range;
}

export type ScreenerLinkParameter = string[];

export type ScreenerSymbolParameter = ScreenerSymbolParameterV2;
export type ScreenerSymbolOperator = ScreenerFilterOperator.includes;

export type SymbolField = SymbolFieldV2;

export type ScreenerSymbolParameterV2 = string[];
export interface SymbolFieldV2 extends BaseScreenerField {
  defaultOperator: ScreenerSymbolOperator;
  defaultParameter: ScreenerSymbolParameterV2;
  type: ScreenerFieldType.symbol;
}

export type ScreenerSymbolParameterV1 = AutocompleteItem[];
export interface SymbolFieldV1 extends BaseScreenerField {
  defaultOperator: ScreenerSymbolOperator;
  defaultParameter: ScreenerSymbolParameterV1;
  type: ScreenerFieldType.symbol;
}

export type ScreenerWatchlistParameterV2 = { watchlistId: string }[] | null;
export type ScreenerWatchlistParameterV1 = ScreenerWatchlistOption[] | null;

export type ScreenerWatchlistParameter = ScreenerWatchlistParameterV2;

export type ScreenerWatchlistOperator = ScreenerFilterOperator.includes;

export interface WatchlistFieldV1 extends BaseScreenerField {
  defaultOperator: ScreenerWatchlistOperator;
  defaultParameter: ScreenerWatchlistParameterV1;
  type: ScreenerFieldType.watchlist;
}
export interface WatchlistFieldV2 extends BaseScreenerField {
  defaultOperator: ScreenerWatchlistOperator;
  defaultParameter: ScreenerWatchlistParameterV2;
  type: ScreenerFieldType.watchlist;
}
export type WatchlistField = WatchlistFieldV2;

export interface ScreenerWatchlistOption {
  label: string;
  optionId: string;
  symbols: string[];
}

export type FieldId = string; // TODO need enum for FieldName

export type ScreenerFieldsById = {
  [fieldId in FieldId]: ScreenerField;
};

export interface CategoryOption {
  categoryId: ScreenerFieldCategory;
  label: string;
}

export interface SignalsEndpointParams extends Params {
  filter: string;
  limit: number;
  screenerQuery?: string;
  start: number;
}

export interface SignalsEndpointResponse {
  signals: Signal[];
}
