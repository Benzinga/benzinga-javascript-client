import { SafePromise } from '@benzinga/safe-await';
import { ExtendedSubscribable, Subscription } from '@benzinga/subscribable';

import { Financials, FinancialsQuery } from './entities';
import { SecuritiesRequest, FinancialsRequestEvent } from './request';
import { SecuritiesStore } from './store';
import { Session } from '@benzinga/session';

interface SecuritiesFunctions {
  getFinancials: SecuritiesManager['getFinancials'];
}

export type SecuritiesManagerEvent = FinancialsRequestEvent;

/**
 * Static-like securities data manager
 *
 * To use, obtain an instance by calling session.getManager(SecuritiesManager)
 *
 * @export
 * @class SecuritiesManager
 * @extends {ExtendedSubscribable<FinancialsRequestEvent, SecuritiesFunctions>}
 */
export class SecuritiesManager extends ExtendedSubscribable<FinancialsRequestEvent, SecuritiesFunctions> {
  private store: SecuritiesStore;
  private request: SecuritiesRequest;
  private requestSubscription?: Subscription<SecuritiesRequest>;

  constructor(session: Session) {
    super();
    this.request = new SecuritiesRequest(session);
    this.store = new SecuritiesStore();
  }

  /**
   * @internal
   *
   * @static
   * @memberof SecuritiesManager
   */
  public static getName = () => 'benzinga-securities';

  /**
   * Compares two financials by IDs
   *
   * Returns true if they are equal
   *
   * @static
   * @param {Financials[]} lhs
   * @param {Financials[]} rhs
   * @memberof SecuritiesManager
   */
  public static compareFinancials = (lhs: Financials[], rhs: Financials[]): boolean => {
    return lhs.every(financial => rhs.some(newFinancial => financial.id === newFinancial.id));
  };

  /**
   * Fetches financials by given query
   *
   * Caches value when possible
   *
   * @param {FinancialsQuery} query
   * @memberof SecuritiesManager
   */
  public getFinancials = async (query: FinancialsQuery): SafePromise<Financials[]> => {
    if (this.store.getFinancials(query) === undefined) {
      const financials = await this.request.getFinancials(query);
      if (financials.ok) {
        if (this.store.setFinancials(query, financials.ok)) {
          this.dispatch({
            financials: financials.ok,
            type: 'financials_updated',
          });
        }
      }
      return financials;
    } else {
      return { ok: this.store.getFinancials(query) ?? [] };
    }
  };

  protected onSubscribe = (): SecuritiesFunctions => ({
    getFinancials: this.getFinancials,
  });

  protected onFirstSubscription = (): void => {
    this.requestSubscription = this.request.listen(event => this.dispatch(event));
  };

  protected onZeroSubscriptions = (): void => {
    this.requestSubscription?.unsubscribe();
  };
}
