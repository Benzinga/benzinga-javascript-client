import { SafeError, SafePromise } from '@benzinga/safe-await';
import { ExtendedListenableSubscribable } from '@benzinga/subscribable';
import { Movers, MoversQuery } from './entities';
import { MoversRestful } from './restful';
import { Session } from '@benzinga/session';

/**
 * Event fired when there is an error to fetch movers
 * @event
 * @type {'movers:get_movers_error'}
 * @memberof ErrorEvent
 */
interface ErrorEvent {
  error?: SafeError;
  errorType: 'movers:get_movers_error';
  type: 'error';
}

/**
 * Event fired when movers started being retrieved
 * @event
 * @type {'movers:retrieving_movers'}
 * @memberof ErrorEvent
 */
interface MoversUpdateEvent {
  type: 'movers:retrieving_movers';
}

export type MoversRequestEvent = ErrorEvent | MoversUpdateEvent;

interface MoversFunctions {
  getMovers: MoversRequest['getMovers'];
}

export class MoversRequest extends ExtendedListenableSubscribable<MoversRequestEvent, MoversFunctions> {
  private restful: MoversRestful;

  constructor(session: Session) {
    super();
    this.restful = new MoversRestful(session);
  }

  public getMovers = async (query: MoversQuery): SafePromise<Movers> => {
    this.dispatch({
      type: 'movers:retrieving_movers',
    });
    const res = await this.restful.getMovers(query);
    if (res.err) {
      this.dispatch({
        error: res.err,
        errorType: 'movers:get_movers_error',
        type: 'error',
      });
      return { err: res.err };
    }
    return { ok: res?.ok?.result };
  };
  protected onSubscribe = (): MoversFunctions => ({
    getMovers: this.getMovers,
  });
}
