import { SafeError, SafePromise } from '@benzinga/safe-await';
import { Session } from '@benzinga/session';
import { ExtendedListenableSubscribable } from '@benzinga/subscribable';
import { egressWiimRequestParams } from './egress';
import { Wiim } from './entities';
import { ingressWiimResponse } from './ingress';
import { WiimsRestful } from './restful';

interface WiimsFunctions {
  getWiims: WiimsRequest['getWiims'];
}

/**
 * Event fired when error is happened during fetching operation for WIIMs
 *
 * @event
 * @interface WiimsErrorEvent
 */
interface WiimsErrorEvent {
  error?: SafeError;
  errorType: 'get_wiims_error';
  type: 'error';
}

/**
 * Event fired when wiims were received
 *
 * @event
 * @interface WiimsEvents
 */
interface WiimsEvents {
  wiims: Wiim[];
  type: 'wiims_received';
}

export type WiimsRequestEvent = WiimsEvents | WiimsErrorEvent;

export interface WiimsRequestParams {
  /**
   * Country code for the region of coverage
   *
   * @type {string}
   * @memberof WiimsRequestParams
   */
  country?: string;

  /**
   * Page offset.
   *
   * @type {number}
   * @memberof WiimsRequestParams
   */
  page?: number;

  /**
   * Number of results returned. Limit 500
   *
   * @type {number}
   * @memberof WiimsRequestParams
   */
  pagesize?: number;

  /**
   * One or more security symbols separated by a comma. Maximum 50 securities.
   * Security identifiers must be in the format of ticker symbols, only for US-listed equities.
   *
   * @type {string}
   * @memberof WiimsRequestParams
   */
  searchKeys?: string;

  /**
   * The type of identifier being searched.
   * Supported types are currently a security symbol
   *
   * @type {'symbol'}
   * @memberof WiimsRequestParams
   */
  searchKeysType?: 'symbol';

  /**
   * Records last Updated Unix timestamp (UTC).
   * This will force the sort order to be Greater Than or Equal to the timestamp indicated.
   * Timestamp may also be in python format to include millisecond updates.
   *
   * @type {number}
   * @memberof WiimsRequestParams
   */
  updatedSince?: number;
}

export class WiimsRequest extends ExtendedListenableSubscribable<WiimsRequestEvent, WiimsFunctions> {
  private restful: WiimsRestful;

  constructor(session: Session) {
    super();
    this.restful = new WiimsRestful(session);
  }

  public getWiims = async (params: WiimsRequestParams): SafePromise<Wiim[]> => {
    const safeWiims = await this.restful.getWiims(egressWiimRequestParams(params));

    if (safeWiims.err) {
      this.dispatch({
        error: safeWiims.err,
        errorType: 'get_wiims_error',
        type: 'error',
      });
      return {
        err: safeWiims.err,
      };
    }

    const wiims = ingressWiimResponse(safeWiims.ok);

    this.dispatch({
      type: 'wiims_received',
      wiims: wiims,
    });

    return {
      ok: wiims,
    };
  };

  protected onSubscribe = (): WiimsFunctions => ({
    getWiims: this.getWiims,
  });
}
