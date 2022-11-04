import { SafePromise } from '@benzinga/safe-await';
import { ExtendedSubscribable } from '@benzinga/subscribable';
import { WiimsRequest, WiimsRequestEvent, WiimsRequestParams } from './request';
import { Session } from '@benzinga/session';
import { Wiim } from './entities';

interface WiimsFunctions {
  getWiims: WiimsManager['getWiims'];
}

export type WiimsManagerEvent = WiimsRequestEvent;

/**
 * Why is it Moving or WIIMs manager
 *
 * Main class for accessing WIIMs API
 *
 * To use, obtain an instance by calling session.getManager(WiimsManager)
 *
 * @export
 * @class WiimsManager
 * @extends {ExtendedSubscribable<WiimsManagerEvent, WiimsFunctions>}
 */
export class WiimsManager extends ExtendedSubscribable<WiimsManagerEvent, WiimsFunctions> {
  private request: WiimsRequest;

  /**
   * @internal
   */
  constructor(session: Session) {
    super();
    this.request = new WiimsRequest(session);
  }

  /**
   * @internal
   */
  public static getName = () => 'benzinga-wiims';

  /**
   * Fetch WIIms using specified query
   *
   * @param {WiimsRequestParams} params
   * @memberof WiimsManager
   */
  public getWiims = async (params: WiimsRequestParams): SafePromise<Wiim[]> => {
    return await this.request.getWiims(params);
  };

  protected onSubscribe(_id: number, ..._args: readonly unknown[]) {
    return {
      getWiims: this.getWiims,
    };
  }
}
