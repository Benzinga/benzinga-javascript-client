import { ExtendedSubscribable, Subscribable, Subscription, SubscribableEvent } from '@benzinga/subscribable';

import { Buffer } from './buffers/buffer';

interface ContainerElement<ContainerType> {
  add?: ContainerType[];
  remove?: ContainerType[];
  update?: ContainerType[];
}

interface ClearEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'clear';
}

interface QueuedEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'queued';
}

interface UpdateEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'update';
}

type Status = 'paused' | 'running';
interface StateEvent {
  type: Status;
}

export type ContainerEvent<ContainerType> =
  | ClearEvent<ContainerType>
  | UpdateEvent<ContainerType>
  | QueuedEvent<ContainerType>
  | StateEvent;

interface ContainerFunctions<
  ContainerType,
  Event extends SubscribableEvent<string>,
  BufferType extends Buffer<ContainerType>,
> {
  clear: Container<ContainerType, Event, BufferType>['clear'];
  getBufferedItems: Container<ContainerType, Event, BufferType>['getBufferedItems'];
  getBufferedItemsLength: Container<ContainerType, Event, BufferType>['getBufferedItemsLength'];
  getQueuedItems: Container<ContainerType, Event, BufferType>['getQueuedItems'];
  getQueuedItemsLength: Container<ContainerType, Event, BufferType>['getQueuedItemsLength'];
  getStatus: Container<ContainerType, Event, BufferType>['getStatus'];
  pause: Container<ContainerType, Event, BufferType>['pause'];
  resume: Container<ContainerType, Event, BufferType>['resume'];
}

export abstract class Container<
  ContainerType,
  Event extends SubscribableEvent<string>,
  BufferType extends Buffer<ContainerType>,
> extends ExtendedSubscribable<ContainerEvent<ContainerType>, ContainerFunctions<ContainerType, Event, BufferType>> {
  private queuedBuffer: BufferType;
  private runningBuffer: BufferType;
  private MaxQueueSize = 10000;
  private status: Status = 'running';
  private subscribable: Subscribable<Event>;
  private subscribableSubscription?: Subscription<Subscribable<Event>>;

  constructor(
    subscribable: Subscribable<Event>,
    MaxQueueSize = 10000,
    runningBuffer: BufferType,
    queuedBuffer: BufferType,
  ) {
    super();
    this.subscribable = subscribable;
    this.MaxQueueSize = MaxQueueSize;
    this.queuedBuffer = queuedBuffer;
    this.runningBuffer = runningBuffer;
  }

  public pause = (): void => {
    this.status = 'paused';
    this.call({ type: 'paused' });
  };

  public resume = (): void => {
    const queueLength = this.queuedBuffer.size();
    const bufferLength = this.runningBuffer.size();
    const enqueueLength = queueLength > this.MaxQueueSize ? this.MaxQueueSize : queueLength;
    const dequeueLength =
      enqueueLength + bufferLength > this.MaxQueueSize ? bufferLength - (this.MaxQueueSize - enqueueLength) : 0;

    const add: ContainerType[] = [];
    const remove: ContainerType[] = [];
    for (let i = 0; i < dequeueLength; ++i) {
      remove.push(this.runningBuffer.pop() as ContainerType);
    }
    for (let i = 0; i < enqueueLength; ++i) {
      const item = this.queuedBuffer.pop() as ContainerType;
      add.push(item);
      this.runningBuffer.push(item);
    }
    this.call({ type: 'running' });
    if (add.length > 0 || remove.length > 0) {
      this.call({
        transaction: {
          add,
          remove,
        },
        type: 'update',
      });
    }
    this.queuedBuffer.clear();
    this.status = 'running';
  };

  public clear = (): void => {
    const remove: ContainerType[] = [];
    while (this.runningBuffer.size() > 0) {
      remove.push(this.runningBuffer.pop() as ContainerType);
    }
    this.queuedBuffer.clear();
    this.runningBuffer.clear();
    this.call({
      transaction: { remove },
      type: 'clear',
    });
  };

  public getBufferedItemsLength = (): number => {
    return this.runningBuffer.size();
  };

  public getBufferedItems = (): readonly ContainerType[] => {
    return this.runningBuffer.toArray();
  };

  public getQueuedItemsLength = (): number => {
    return this.queuedBuffer.size();
  };

  public getQueuedItems = (): readonly ContainerType[] => {
    return this.queuedBuffer.toArray();
  };

  public getStatus = (): Status => {
    return this.status;
  };

  protected onSubscribe = (): ContainerFunctions<ContainerType, Event, BufferType> => {
    return {
      clear: this.clear,
      getBufferedItems: this.getBufferedItems,
      getBufferedItemsLength: this.getBufferedItemsLength,
      getQueuedItems: this.getQueuedItems,
      getQueuedItemsLength: this.getQueuedItemsLength,
      getStatus: this.getStatus,
      pause: this.pause,
      resume: this.resume,
    };
  };

  protected onFirstSubscription = (): void => {
    if (this.subscribableSubscription === undefined) {
      this.subscribableSubscription = this.subscribable.subscribe(this.onMessage);
    }
  };

  protected onZeroSubscriptions = (): void => {
    this.subscribableSubscription?.unsubscribe();
    this.subscribableSubscription = undefined;
  };

  protected pushItems = (items: ContainerType[]): void => {
    switch (this.status) {
      case 'paused':
        while (this.queuedBuffer.size() + items.length >= this.MaxQueueSize) {
          this.queuedBuffer.pop();
        }
        items.forEach(item => this.queuedBuffer.push(item));
        this.call({
          transaction: {
            add: items,
          },
          type: 'queued',
        });
        break;
      case 'running': {
        const remove: ContainerType[] = [];
        while (this.runningBuffer.size() + items.length >= this.MaxQueueSize) {
          const item = this.runningBuffer.pop();
          if (item) {
            remove.push(item);
          }
        }
        items.forEach(item => this.runningBuffer.push(item));
        this.call({
          transaction: {
            add: items,
            remove: remove.length > 0 ? remove : undefined,
          },
          type: 'update',
        });
        break;
      }
    }
  };

  protected push = (item: ContainerType): void => {
    this.pushItems([item]);
  };

  protected abstract onMessage(_event: Event): void;
}
