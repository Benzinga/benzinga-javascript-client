import { SafePromise } from '@benzinga/safe-await';

import { IncludeHeader, RestfulClient } from '@benzinga/session';
import { Signal, SignalsScreenerFilter, SignalType } from './entities';
import { generateSignalsParams } from './generateParams';
import { Session } from '@benzinga/session';
import { SignalsEnvironment } from './environment';
import { WatchlistManager } from '@benzinga/watchlist-manager';
import { WidgetLinkingManager } from '@benzinga/widget-linking';

export class SignalsRequest extends RestfulClient {
  private watchlistManager: WatchlistManager;
  private linkingManager: WidgetLinkingManager;
  constructor(session: Session, includeHeader?: IncludeHeader) {
    super(session.getEnvironment(SignalsEnvironment).restfulUrl, session, includeHeader);
    this.watchlistManager = session.getManager(WatchlistManager);
    this.linkingManager = session.getManager(WidgetLinkingManager);
  }
  getSignals = (
    selectedSignalTypes: SignalType[],
    screenerFilters: SignalsScreenerFilter[],
  ): SafePromise<{ signals?: Signal[] }> => {
    const params = {
      ...generateSignalsParams(selectedSignalTypes, screenerFilters, this.watchlistManager, this.linkingManager),
      apikey: this.session.getEnvironment(SignalsEnvironment).key,
    };
    const url = this.URL('signals', params);
    return this.get(url, { credentials: `same-origin` });
  };
}
