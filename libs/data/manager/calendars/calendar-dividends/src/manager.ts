import { CommonCalendarManager, CommonCalendarQueryParams } from '@benzinga/calendar-commons';
import { SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { Dividend } from './entities';
import { DividendsCalendarEnvironment } from './environment';

export interface DividendsQueryParams extends CommonCalendarQueryParams {
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
 * To use, obtain an instance by calling session.getManager(DividendsManager)
 *
 * @export
 * @class DividendsManager
 * @extends {CommonCalendarManager<'dividends', Dividend>}
 */
export class DividendsManager extends CommonCalendarManager<'dividends', Dividend> {
  constructor(session: Session) {
    super(session, session.getEnvironment(DividendsCalendarEnvironment), 'dividends');
  }

  public static getName = () => 'benzinga-calendar-dividends';

  /**
   * Fetch dividends calendar records, filtered by params
   *
   * @param {DividendsQueryParams} params
   * @return {*}  {SafePromise<Dividend[]>}
   * @memberof DividendsManager
   */
  public getDividends(params: DividendsQueryParams): SafePromise<Dividend[]> {
    return this.request.fetchCalendarData(params, {
      dividend_yield: params.dividendYield,
      dividend_yield_operation: params.dividendYieldOperation,
    });
  }
}
