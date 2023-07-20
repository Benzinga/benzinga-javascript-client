import { CommonCalendarManager, CommonCalendarQueryParams, genUrlParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Dividend } from './entities';
import { DividendsCalendarEnvironment } from './environment';

export interface DividendsQueryParams extends CommonCalendarQueryParams {
  /**
   * Dividends date field to sort on (newest to oldest for expected and completed; oldest to newest for announced)
   *
   * @type {('announced ' | 'ex' | 'payable' | 'record')}
   * @memberof DividendsQueryParams
   */
  dateSort?: 'announced ' | 'ex' | 'payable' | 'record';

  /**
   * Specifies how to filter using dividend yield. gt = Greater Than, gte = Greater Than Equal, eq = Equal, lt = Less Than, lte = Less Than Equal
   *
   * @type {('gt' | 'gte' | 'eq' | 'lt' | 'lte')}
   * @memberof DividendsQueryParams
   */
  dividendYieldOperation?: 'gt' | 'gte' | 'eq' | 'lt' | 'lte';

  /**
   * The dividend yield amount to filter by.
   * Defaults to using Equal To the amount indicated.
   * 1 =100%eater Than or Equal To’, ‘Equal To’, ‘Less Than or Equal To’, and ‘Less Than’ filters respectively.
   *
   * @type {number}
   * @memberof DividendsQueryParams
   */
  dividendYield?: number;
}

/**
 * Calendar dividends manager
 *
 * To use, obtain an instance by calling session.getManager(DividendsCalendarManager)
 *
 * @export
 * @class DividendsCalendarManager
 * @extends {CommonCalendarManager<'dividends', Dividend>}
 */
export class DividendsCalendarManager extends CommonCalendarManager<'dividends', Dividend> {
  constructor(session: Session) {
    super(session, session.getEnvironment(DividendsCalendarEnvironment), 'dividends', {
      formatResponse: (data: unknown): Dividend[] => {
        return data as Dividend[];
      },
      genUrlParams: (params: DividendsQueryParams) => {
        const selfParams = {
          ...params,
          date_sort: params.dateSort,
          dividend_yield: params.dividendYield,
          dividend_yield_operation: params.dividendYieldOperation,
        };
        return genUrlParams(selfParams);
      },
    });
  }

  public static getName = () => 'benzinga-calendar-dividends';

  /**
   * Fetch dividends calendar records, filtered by params
   *
   * @param {DividendsQueryParams} params
   * @return {*}  {SafePromise<Dividend[]>}
   * @memberof DividendsCalendarManager
   */
  public getDividends(params: DividendsQueryParams): SafePromise<Dividend[]> {
    return this.request.fetchCalendarData(params);
  }
}
