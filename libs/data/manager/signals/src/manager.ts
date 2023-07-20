import { Subscribable } from '@benzinga/subscribable';
import { SignalFeed, SignalFeedEvent } from './signalFeed';
import { Session } from '@benzinga/session';

export type SignalsManagerEvent = SignalFeedEvent;

export class SignalsManager extends Subscribable<SignalsManagerEvent> {
  private session: Session;

  constructor(session: Session) {
    super();
    this.session = session;
  }

  public static getName = () => 'benzinga-signals';

  public createFeed = (): SignalFeed => {
    return new SignalFeed(this.session);
  };
}
