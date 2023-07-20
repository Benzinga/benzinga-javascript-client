import { Subscribable, Subscription, SubscribableEvent } from '@benzinga/subscribable';
import { SubscriberContainer } from './subscriberContainer';

import { Buffer } from './buffers/buffer';

export abstract class SubscriptionContainer<
  ContainerType,
  Event extends SubscribableEvent<string>,
  BufferType extends Buffer<ContainerType>,
> extends SubscriberContainer<ContainerType, BufferType> {
  private subscribable: Subscribable<Event>;
  private subscribableSubscription?: Subscription<Subscribable<Event>>;

  constructor(
    subscribable: Subscribable<Event>,
    MaxQueueSize = 10000,
    runningBuffer: BufferType,
    queuedBuffer: BufferType,
  ) {
    super(MaxQueueSize, queuedBuffer, runningBuffer);
    this.subscribable = subscribable;
  }

  protected onFirstSubscription = (): void => {
    if (this.subscribableSubscription === undefined) {
      this.subscribableSubscription = this.subscribable.subscribe(this.onMessage);
    }
  };

  protected onZeroSubscriptions = (): void => {
    this.subscribableSubscription?.unsubscribe();
    this.subscribableSubscription = undefined;
  };

  protected abstract onMessage(_event: Event): void;
}
