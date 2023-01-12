import { SafeError, SafePromise } from '@benzinga/safe-await';
import { ExtendedListenableSubscribable } from '@benzinga/subscribable';

import { Financials, FinancialsQuery } from './entities';
import { SecuritiesRestful } from './restful';
import { ingestSecurities } from './ingest';
import { Session } from '@benzinga/session';

/**
 * Event emitted when there was error fetching financials
 *
 * @event
 *
 * @interface ErrorEvent
 */
interface ErrorEvent {
  error?: SafeError;
  errorType: 'get_financials_error';
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
  type: 'financials_updated' | 'financials_received';
}

export type FinancialsRequestEvent = ErrorEvent | FinancialsUpdateEvent;

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

  protected onSubscribe = (): SecuritiesFunctions => ({
    getFinancials: this.getFinancials,
  });
}
