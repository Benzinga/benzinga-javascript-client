import { Subscribable, Subscription, SubscribableEvent } from './subscribable';
import { mapDifference, mapIntersection } from '@benzinga/utils';

type SubscriberUniqueId = unknown;

interface SubscribableMultiplexerAddEvent<T extends SubscribableEvent<string>> {
  id: SubscriberUniqueId;
  subscribable: Subscribable<T>;
  type: 'subscribable-multiplexer-add';
}

interface SubscribableMultiplexerRemovedEvent {
  id: SubscriberUniqueId;
  type: 'subscribable-multiplexer-removed';
}

export type SubscribableMultiplexerEvent<T extends SubscribableEvent<string>> =
  | SubscribableMultiplexerAddEvent<T>
  | SubscribableMultiplexerRemovedEvent
  | T;

export class SubscribableMultiplexer<Events extends SubscribableEvent<string>> extends Subscribable<
  SubscribableMultiplexerEvent<Events>
> {
  private subscribables: Map<SubscriberUniqueId, Subscribable<Events>>;
  private subscriptions?: Map<SubscriberUniqueId, Subscription<Subscribable<Events>>>;

  constructor(subscribables: [SubscriberUniqueId, Subscribable<Events>][]) {
    super();
    this.subscribables = new Map(subscribables);
  }

  public add = (id: SubscriberUniqueId, subscribable: Subscribable<Events>): void => {
    if (this.subscribables.get(id) !== subscribable) {
      if (this.subscriptions) {
        const subFound = this.subscriptions.get(id);
        if (subFound) {
          subFound.unsubscribe();
        }
        this.subscriptions.set(
          id,
          subscribable.subscribe(event => this.dispatch(event)),
        );
      }
      this.subscribables.set(id, subscribable);
      this.dispatch({
        id,
        subscribable,
        type: 'subscribable-multiplexer-add',
      });
    }
  };

  public remove = (id: SubscriberUniqueId): void => {
    if (this.subscriptions) {
      const subFound = this.subscriptions.get(id);
      if (subFound) {
        subFound.unsubscribe();
      }
      this.subscriptions.delete(id);
    }
    if (this.subscribables.delete(id)) {
      this.dispatch({
        id,
        type: 'subscribable-multiplexer-removed',
      });
    }
  };

  public replace = (subscribables: [SubscriberUniqueId, Subscribable<Events>][]): void => {
    const newSubscribables = new Map(subscribables);
    const inThisOnly = mapDifference(this.subscribables, newSubscribables);
    const inNewOnly = mapDifference(newSubscribables, this.subscribables);
    const inBoth = mapIntersection(this.subscribables, newSubscribables);
    inThisOnly.forEach((_, key) => this.remove(key));
    inNewOnly.forEach((value, key) => this.add(key, value));
    // update incase the value has changed
    inBoth.forEach((value, key) => this.add(key, value));
  };

  public get = (id: SubscriberUniqueId): Subscribable<Events> | undefined => this.subscribables.get(id);

  protected onFirstSubscription = (): void => {
    const subscriptions: [SubscriberUniqueId, Subscription<Subscribable<Events>>][] = [];
    this.subscribables.forEach((val, key) => subscriptions.push([key, val.subscribe(event => this.dispatch(event))]));
    this.subscriptions = new Map(subscriptions);
  };

  protected onZeroSubscriptions = (): void => {
    this.subscriptions?.forEach(sub => sub.unsubscribe());
    this.subscriptions = undefined;
  };
}
