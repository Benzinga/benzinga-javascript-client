export type AuthKey = string;
export type HexColor = string;
export type ISO8601 = string; // e.g. "2017-11-03T13:17:03Z"

/*
 * UnixTime in Seconds
 */
export type UnixTimestamp = string;
export type JSONString = string;
export type MECSSectorCode = string; // a string that starts with "MECS:" e.g. "MECS:201"
export type Milliseconds = number;
export type Seconds = number;
export type StringNumber = string; // a string that only contains numbers
export type URLString = string;

export type UUID = string | '';
/*
 * system
 */
export interface Params {
  [key: string]: string | number | boolean | undefined | null;
}

// ---------------------------------- TODO THROW AWAY ----------------------------------

export enum CookiesKey {
  benzingaToken = 'benzinga_token',
  runtimeEnv = 'runtime-env',
}

export enum StorageKey {
  activeChannelId = 'activeChannelId',

  // session keys
  authKey = 'authKey',
  // notification
  bzNotificationIgnore = 'bzNotificationIgnore',
  // deprecated categories helpers
  deprecatedCategories = 'deprecatedCategories',

  // Popout keys
  fetchWatchlists = 'fetchWatchlists',
  fingerprint = 'fingerprint',

  hasLoadedCategories = 'hasLoadedCategories',
  lastLoadedLayoutId = 'lastLoadedLayoutId',
  // Layout keys
  lastSendLayoutTime = 'lastSendLayoutTime',
  layout = 'layout',
  layoutId = 'layoutId',

  layoutVersion = 'layoutVersion',
  popoutCachedState = 'popoutCachedState',

  popoutDataTransfer = 'popoutDataTransfer',
  popoutUpdate = 'popoutUpdate',
  sessionExpired = 'sessionExpired',
  theme = 'theme',

  // TradeInfoKeys
  tradeInfo = 'tradeInfo',
}

export enum PersistStorageKey {
  chat = 'persist:chat',
  popoutWidgetsById = 'persist:widgetsById-popout',
  settings = 'persist:settings',
  sources = 'persist:sources',
  watchlists = 'persist:watchlists',
  watchlistsById = 'persist:watchlistsById',
  widgetsById = 'persist:widgetsById',

  workspaces = 'persist:workspaces',

  workspacesById = 'persist:workspacesById',
}
