import { ExtendedSubscribable } from '@benzinga/subscribable';
import { FinancialsRequestEvent, SecuritiesRequest } from './request';
import { Financials, FinancialsQuery, Ownership, Peer } from './entities';
import { SafePromise } from '@benzinga/safe-await';
import { SecuritiesStore } from './store';
import { StockSymbol } from '@benzinga/session';
import { InsidersFiling } from '@benzinga/insider-trades-manager';

interface SecuritiesFunctions {
  getFinancials: Security['getFinancials'];
  getInsiders: Security['getInsiders'];
  getOwnership: Security['getOwnership'];
  getPeers: Security['getPeers'];
}

interface FinancialsEvent {
  financials: Financials[];
  type: 'financials_updated';
}

export type SecuritiesManagerEvent = FinancialsRequestEvent | FinancialsEvent;
export class Security extends ExtendedSubscribable<SecuritiesManagerEvent, SecuritiesFunctions> {
  private store: SecuritiesStore;
  private request: SecuritiesRequest;
  private symbol: StockSymbol;

  constructor(symbol: StockSymbol, request: SecuritiesRequest) {
    super();

    this.symbol = symbol;
    this.request = request;
    this.store = new SecuritiesStore();
  }

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

  public getSymbol = () => this.symbol;

  /**
   * Fetches financials by given query
   *
   * Caches value when possible
   *
   * @param {FinancialsQuery} query
   * @memberof SecuritiesManager
   */
  public getFinancials = async (query: Omit<FinancialsQuery, 'symbol'>): SafePromise<Financials[]> => {
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

  public getOwnership = async (symbol: string): SafePromise<Ownership | undefined> => {
    if (this.store.getOwnership(symbol) === undefined) {
      const ownership = await this.request.getOwnership(symbol);
      if (ownership.ok) {
        this.store.setOwnership(symbol, ownership.ok);
      }
      return ownership;
    }
    return { ok: this.store.getOwnership(symbol) ?? undefined };
  };

  public getPeers = async (symbol: string): SafePromise<Peer[] | undefined> => {
    if (this.store.getPeers(symbol) === undefined) {
      const peers = await this.request.getPeers(symbol);
      if (peers.ok) {
        this.store.setPeers(symbol, peers.ok);
      }
      return peers;
    }
    return { ok: this.store.getPeers(symbol) ?? [] };
  };

  public getInsiders = async (symbol: string): SafePromise<InsidersFiling[] | undefined> => {
    if (this.store.getInsiders(symbol) === undefined) {
      const insiders = await this.request.getInsiders(symbol);
      if (insiders.ok) {
        this.store.setInsiders(symbol, insiders.ok);
      }
      return insiders;
    }
    return { ok: this.store.getInsiders(symbol) ?? [] };
  };

  protected onSubscribe = (): SecuritiesFunctions => ({
    getFinancials: this.getFinancials,
    getInsiders: this.getInsiders,
    getOwnership: this.getOwnership,
    getPeers: this.getPeers,
  });
}
