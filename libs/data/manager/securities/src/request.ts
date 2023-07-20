import { SafeError, SafePromise } from '@benzinga/safe-await';
import { ExtendedListenableSubscribable } from '@benzinga/subscribable';

import { Financials, FinancialsQuery, Ownership, Peer } from './entities';
import { SecuritiesRestful } from './restful';
import { ingestInsiders, ingestOwnership, ingestPeers, ingestSecurities } from './ingest';
import { Session } from '@benzinga/session';
import { InsidersFiling } from '@benzinga/insider-trades-manager';

/**
 * Event emitted when there was error fetching financials
 *
 * @event
 *
 * @interface ErrorEvent
 */
interface ErrorEvent {
  error?: SafeError;
  errorType: 'get_financials_error' | 'get_ownership_error' | 'get_peers_error' | 'get_insiders_error';
  type: 'error';
}

/**
 * Financials update or receival event
 *
 * @event
 *
 * @interface FinancialsUpdateEvent
 */
interface FinancialsUpdateEvent {
  financials: Financials[];
  type: 'financials_received';
}

export type FinancialsRequestEvent =
  | ErrorEvent
  | FinancialsUpdateEvent
  | OwnershipUpdateEvent
  | PeersUpdateEvent
  | InsidersUpdateEvent;

interface OwnershipUpdateEvent {
  ownership: Ownership;
  type: 'ownership_received' | 'ownership_updated';
}

interface PeersUpdateEvent {
  peers: Peer[];
  type: 'peers_received' | 'peers_updated';
}

interface InsidersUpdateEvent {
  insiders: InsidersFiling[];
  type: 'insiders_received' | 'insiders_updated';
}
interface SecuritiesFunctions {
  getFinancials: SecuritiesRequest['getFinancials'];
}

export class SecuritiesRequest extends ExtendedListenableSubscribable<FinancialsRequestEvent, SecuritiesFunctions> {
  private restful: SecuritiesRestful;

  constructor(session: Session) {
    super();
    this.restful = new SecuritiesRestful(session);
  }

  public getFinancials = async (query: FinancialsQuery): SafePromise<Financials[]> => {
    const financials = await ingestSecurities(this.restful.getFinancials(query));
    if (financials.err) {
      this.dispatch({
        error: financials.err,
        errorType: 'get_financials_error',
        type: 'error',
      });
    } else {
      this.dispatch({
        financials: financials.ok,
        type: 'financials_received',
      });
    }
    return financials;
  };

  public getOwnership = async (symbol: string): SafePromise<Ownership> => {
    const ownership = await ingestOwnership(this.restful.getOwnership(symbol));
    if (ownership.err) {
      this.dispatch({
        error: ownership.err,
        errorType: 'get_ownership_error',
        type: 'error',
      });
    } else {
      this.dispatch({
        ownership: ownership.ok,
        type: 'ownership_received',
      });
    }
    return ownership;
  };

  public getPeers = async (symbol: string): SafePromise<Peer[]> => {
    const peers = await ingestPeers(this.restful.getPeers(symbol));
    if (peers.err) {
      this.dispatch({
        error: peers.err,
        errorType: 'get_peers_error',
        type: 'error',
      });
    } else {
      this.dispatch({
        peers: peers.ok,
        type: 'peers_received',
      });
    }
    return peers;
  };

  public getInsiders = async (symbol: string): SafePromise<InsidersFiling[]> => {
    const insiders = await ingestInsiders(this.restful.getInsiders(symbol));
    if (insiders.err) {
      this.dispatch({
        error: insiders.err,
        errorType: 'get_insiders_error',
        type: 'error',
      });
    } else {
      this.dispatch({
        insiders: insiders.ok,
        type: 'insiders_received',
      });
    }
    return insiders;
  };

  protected onSubscribe = (): SecuritiesFunctions => ({
    getFinancials: this.getFinancials,
  });
}
