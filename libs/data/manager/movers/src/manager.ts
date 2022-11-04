import { SafePromise } from '@benzinga/safe-await';
import { ExtendedSubscribable } from '@benzinga/subscribable';

import { Session } from '@benzinga/session';
import { Movers, MoversQuery } from './entities';
import { MoversRequest, MoversRequestEvent } from './request';

interface MoversFunctions {
  getMovers: MoversManager['getMovers'];
}

export type MoversManagerEvent = MoversRequestEvent;

/**
 * Movers manager
 *
 * Main class for calling Movers API
 *
 * To use, obtain an instance by calling session.getManager(MoversManager)
 *
 * @export
 * @class MoversManager
 * @extends {ExtendedSubscribable<MoversManagerEvent, MoversFunctions>}
 */
export class MoversManager extends ExtendedSubscribable<MoversManagerEvent, MoversFunctions> {
  private request: MoversRequest;

  /**
   * @internal
   */
  constructor(session: Session) {
    super();
    this.request = new MoversRequest(session);
  }

  /**
   * @internal
   */
  public static getName = () => 'benzinga-movers';

  /**
   * Fetch movers data by given query
   *
   * @param {MoversQuery} query
   * @memberof MoversManager
   */
  public getMovers = async (query: MoversQuery): SafePromise<Movers | undefined> => {
    return await this.request.getMovers(query);
  };

  protected onSubscribe = (): MoversFunctions => ({
    getMovers: this.getMovers,
  });
}
