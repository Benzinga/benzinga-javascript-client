import { Subscribable } from '@benzinga/subscribable';
import { LinkListBuffer, SubscriptionContainer, ContainerEvent } from '@benzinga/containers';
import { Signal } from './entities';
import { SignalFeedEvent } from './signalFeed';

export type SignalContainerEvent = ContainerEvent<Signal>;
export class SignalContainer extends SubscriptionContainer<Signal, SignalFeedEvent, LinkListBuffer<Signal>> {
  constructor(signalSocket: Subscribable<SignalFeedEvent>, MaxQueueSize = 10000) {
    super(signalSocket, MaxQueueSize, new LinkListBuffer<Signal>(), new LinkListBuffer<Signal>());
  }

  protected onMessage = (event: SignalFeedEvent): void => {
    switch (event.type) {
      case 'signals:historic_signals':
        this.pushItems(event.signals);
        break;
      case 'signals:live_signal':
        this.push(event.signal);
        break;
      case 'signals:feed':
        this.clear();
        break;
      case 'signals:status':
        if (event.status === 'reconnected') {
          this.clear();
        }
        break;
    }
  };
}
