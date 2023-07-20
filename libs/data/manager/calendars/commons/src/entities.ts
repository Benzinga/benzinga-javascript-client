import { SafeError } from '@benzinga/safe-await';

/**
 * Common calendar entity
 *
 * Most calendar entities extend this interface
 *
 * @internal
 *
 * @export
 * @interface CommonCalendarEventEntity
 * @template EntityType
 */
export interface CommonCalendarEventEntity<EntityType extends string> {
  /**
   * Unique ID of this entry
   *
   * @type {string}
   * @memberof CommonCalendarEventEntity
   */
  id: string;

  /**
   * Name of record
   *
   * @type {string}
   * @memberof CommonCalendarEventEntity
   */
  name?: string;

  /**
   * Ticker symbol of company
   *
   * @type {string}
   * @memberof CommonCalendarEventEntity
   */
  ticker: string;

  type?: EntityType;

  /**
   * Last updated timestamp, UTC
   *
   * @type {number}
   * @memberof CommonCalendarEventEntity
   */
  updated: number;

  /**
   * Additional notes provided by the Benzinga Newsdesk where applicable.
   * Notes may include HTML.
   *
   * @type {string}
   * @memberof CommonCalendarEventEntity
   */
  notes?: string;
}

export interface CommonCalendarQueryParams {
  /**
   * Date to query from point in time.
   *
   * @type {string}
   * @memberof CommonCalendarQueryParams
   */
  dateFrom?: string;

  /**
   * Date to query to point in time.
   *
   * @type {string}
   * @memberof CommonCalendarQueryParams
   */
  dateTo?: string;

  /**
   * Display Style
   *
   * @type {string}
   * @memberof CommonCalendarQueryParams
   */
  display?: string;

  /**
   * list of comma separated field names that you would like the server to return. by default all fields are returned.
   *
   * @type {string}
   * @memberof CommonCalendarQueryParams
   */
  fields?: string;

  /**
   * Number of results returned. Limit 1000
   *
   * @type {number}
   * @memberof CommonCalendarQueryParams
   */
  pageSize?: number;

  /**
   * Page offset.
   *
   * For optimization, performance and technical reasons, page offsets are limited from 0 - 100000.
   * Limit the query results by other parameters such as date.
   *
   * @type {number}
   * @memberof CommonCalendarQueryParams
   */
  page?: number;

  /**
   * One or more ticker symbols separated by a comma.
   * All calendars accept this parameter (not including the FDA endpoint; for the FDA endpoint, please use "parameters[securities]" instead).
   * Ignored by the Economics endpoint.
   * Maximum 50 tickers.
   * Note that for the IPOs endpoint, new tickers may not return results right away as we do not automatically link them to the underlying company's data.
   * Thus, to obtain the most recent rows from the IPOs endpoint, send queries without this parameter specified.
   *
   * @type {string[]}
   * @memberof CommonCalendarQueryParams
   */
  symbols?: string[];
  importance?: number;
}

export type CommonCalendarEventType<EntityName extends string> = `${EntityName}:fetched_data` | `${EntityName}:error`;

export interface CommonCalendarEventBase<T extends string> {
  type: CommonCalendarEventType<T>;
}

/**
 * Event, emitted when calendar data was fetched
 *
 * @event
 * @export
 * @interface GetCalendarDataEvent
 * @extends {CommonCalendarEventBase<Type>}
 * @template Type
 * @template Entity
 */
export interface GetCalendarDataEvent<Type extends string, Entity> extends CommonCalendarEventBase<Type> {
  result: Entity[];
  type: `${Type}:fetched_data`;
}

/**
 * Event, emitted when there was an error in calendar querying
 *
 * @event
 * @export
 * @interface CalendarErrorEvent
 * @extends {CommonCalendarEventBase<Type>}
 * @template Type
 */
export interface CalendarErrorEvent<Type extends string> extends CommonCalendarEventBase<Type> {
  type: `${Type}:error`;
  error?: SafeError;
  errorType: CommonCalendarErrorType;
  parameters?: CommonCalendarQueryParams;
}

export enum CommonCalendarErrorType {
  GET_DATA = 'get_data_error',
}

export type CommonCalendarEvent<T extends string, E> = GetCalendarDataEvent<T, E> | CalendarErrorEvent<T>;
