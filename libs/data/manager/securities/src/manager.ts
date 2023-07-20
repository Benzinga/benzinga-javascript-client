import { SafePromise } from '@benzinga/safe-await';
import { ExtendedSubscribable, Subscription } from '@benzinga/subscribable';

import { Financials, FinancialsQuery, Ownership, Peer } from './entities';
import { SecuritiesRequest, FinancialsRequestEvent } from './request';
import { SecuritiesStore } from './store';
import { Session, StockSymbol } from '@benzinga/session';
import { InsidersFiling } from '@benzinga/insider-trades-manager';
import { oneRequestAtATimeMultipleArgs } from '@benzinga/utils';

interface SecuritiesFunctions {
  getFinancials: SecuritiesManager['getFinancials'];
  getOwnership: SecuritiesManager['getOwnership'];
}

interface FinancialsUpdateEvent {
  financials: Financials[];
  query: FinancialsQuery;
  type: 'financials_updated';
}

export type SecuritiesManagerEvent = FinancialsRequestEvent | FinancialsUpdateEvent;

/**
 * Static-like securities data manager
 *
 * To use, obtain an instance by calling session.getManager(SecuritiesManager)
 *
 * @export
 * @class SecuritiesManager
 * @extends {ExtendedSubscribable<SecuritiesManagerEvent, SecuritiesFunctions>}
 */
export class SecuritiesManager extends ExtendedSubscribable<SecuritiesManagerEvent, SecuritiesFunctions> {
  private store: SecuritiesStore;
  private request: SecuritiesRequest;
  private requestSubscription?: Subscription<SecuritiesRequest>;
  private requestFinancials;
  private requestOwnership;
  private requestPeers;
  private requestInsiders;

  constructor(session: Session) {
    super();
    this.request = new SecuritiesRequest(session);
    this.store = new SecuritiesStore();
    this.requestFinancials = oneRequestAtATimeMultipleArgs(this.request.getFinancials);
    this.requestOwnership = oneRequestAtATimeMultipleArgs(this.request.getOwnership);
    this.requestPeers = oneRequestAtATimeMultipleArgs(this.request.getPeers);
    this.requestInsiders = oneRequestAtATimeMultipleArgs(this.request.getInsiders);
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
  public getFinancialsCached = (query: FinancialsQuery) => this.store.getFinancials(query);
  public getFinancials = async (query: FinancialsQuery): SafePromise<Financials[]> => {
    if (this.store.getFinancials(query) === undefined) {
      const financials = await this.requestFinancials(query);
      if (financials.ok) {
        if (this.store.setFinancials(query, financials.ok)) {
          this.dispatch({
            financials: financials.ok,
            query,
            type: 'financials_updated',
          });
        }
      }
      return financials;
    } else {
      return { ok: this.store.getFinancials(query) ?? [] };
    }
  };

  public getOwnershipCached = (symbol: StockSymbol) => this.store.getOwnership(symbol);
  public getOwnership = async (symbol: StockSymbol): SafePromise<Ownership | undefined> => {
    if (this.store.getOwnership(symbol) === undefined) {
      const ownership = await this.requestOwnership(symbol);
      if (ownership.ok) {
        this.store.setOwnership(symbol, ownership.ok);
      }
      return ownership;
    }
    return { ok: this.store.getOwnership(symbol) ?? undefined };
  };

  public getPeersCached = (symbol: StockSymbol) => this.store.getPeers(symbol);
  public getPeers = async (symbol: StockSymbol): SafePromise<Peer[] | undefined> => {
    if (this.store.getPeers(symbol) === undefined) {
      const peers = await this.requestPeers(symbol);
      if (peers.ok) {
        this.store.setPeers(symbol, peers.ok);
      }
      return peers;
    }
    return { ok: this.store.getPeers(symbol) ?? [] };
  };

  public getInsidersCached = (symbol: StockSymbol) => this.store.getInsiders(symbol);
  public getInsiders = async (symbol: StockSymbol): SafePromise<InsidersFiling[] | undefined> => {
    if (this.store.getInsiders(symbol) === undefined) {
      const insiders = await this.requestInsiders(symbol);
      if (insiders.ok) {
        this.store.setInsiders(symbol, insiders.ok);
      }
      return insiders;
    }
    return { ok: this.store.getInsiders(symbol) ?? [] };
  };

  protected onSubscribe = (): SecuritiesFunctions => ({
    getFinancials: this.getFinancials,
    getOwnership: this.getOwnership,
  });

  protected onFirstSubscription = (): void => {
    this.requestSubscription = this.request.listen(event => this.dispatch(event));
  };

  protected onZeroSubscriptions = (): void => {
    this.requestSubscription?.unsubscribe();
  };
}
