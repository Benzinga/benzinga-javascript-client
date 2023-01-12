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

interface LiveQueuedEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'live_queued';
}

interface HistoricQueuedEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'historic_queued';
}

interface LiveUpdateEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'live_update';
}

interface HistoricUpdateEvent<ContainerType> {
  transaction: ContainerElement<ContainerType>;
  type: 'historic_update';
}

type StatusType = 'paused' | 'running';

interface Status {
  all: StatusType;
  historic: StatusType;
  live: StatusType;
}

interface StateEvent {
  status: Status;
  type: 'status';
}

export type DisplayContainerEvent<ContainerType> =
  | ClearEvent<ContainerType>
  | LiveQueuedEvent<ContainerType>
  | HistoricQueuedEvent<ContainerType>
  | LiveUpdateEvent<ContainerType>
  | HistoricUpdateEvent<ContainerType>
  | StateEvent;

interface DisplayContainerFunctions<
  ContainerType,
  Event extends SubscribableEvent<string>,
  BufferType extends Buffer<ContainerType>,
> {
  clear: DisplayContainer<ContainerType, Event, BufferType>['clear'];
  getDisplayItems: DisplayContainer<ContainerType, Event, BufferType>['getDisplayItems'];
  getDisplayItemsLength: DisplayContainer<ContainerType, Event, BufferType>['getDisplayItemsLength'];
  getHistoricItems: DisplayContainer<ContainerType, Event, BufferType>['getHistoricItems'];
  getHistoricItemsLength: DisplayContainer<ContainerType, Event, BufferType>['getHistoricItemsLength'];
  getLiveItems: DisplayContainer<ContainerType, Event, BufferType>['getLiveItems'];
  getLiveItemsLength: DisplayContainer<ContainerType, Event, BufferType>['getLiveItemsLength'];
  getStatus: DisplayContainer<ContainerType, Event, BufferType>['getStatus'];
  pause: DisplayContainer<ContainerType, Event, BufferType>['pause'];
  pauseHistoric: DisplayContainer<ContainerType, Event, BufferType>['pauseHistoric'];
  pauseLive: DisplayContainer<ContainerType, Event, BufferType>['pauseLive'];
  pushHistoricItem: DisplayContainer<ContainerType, Event, BufferType>['pushHistoricItem'];
  pushHistoricItems: DisplayContainer<ContainerType, Event, BufferType>['pushHistoricItems'];
  pushLiveItem: DisplayContainer<ContainerType, Event, BufferType>['pushLiveItem'];
  pushLiveItems: DisplayContainer<ContainerType, Event, BufferType>['pushLiveItems'];
  resume: DisplayContainer<ContainerType, Event, BufferType>['resume'];
  resumeHistoric: DisplayContainer<ContainerType, Event, BufferType>['resumeHistoric'];
  resumeLive: DisplayContainer<ContainerType, Event, BufferType>['resumeLive'];
}

export abstract class DisplayContainer<
  ContainerType,
  Event extends SubscribableEvent<string>,
  BufferType extends Buffer<ContainerType>,
> extends ExtendedSubscribable<
  DisplayContainerEvent<ContainerType>,
  DisplayContainerFunctions<ContainerType, Event, BufferType>
> {
  private liveBuffer: BufferType;
  private historicBuffer: BufferType;
  private displayBuffer: BufferType;
  private MaxQueueSize = 10000;
  private status: Status = {
    all: 'running',
    historic: 'running',
    live: 'running',
  };
  private subscribable: Subscribable<Event>;
  private subscribableSubscription?: Subscription<Subscribable<Event>>;

  constructor(
    subscribable: Subscribable<Event>,
    MaxQueueSize = 10000,
    displayBuffer: BufferType,
    liveBuffer: BufferType,
    historicBuffer: BufferType,
  ) {
    super();
    this.subscribable = subscribable;
    this.MaxQueueSize = MaxQueueSize;
    this.liveBuffer = liveBuffer;
    this.historicBuffer = historicBuffer;
    this.displayBuffer = displayBuffer;
  }

  public pause = (): void => {
    this.status['all'] = 'paused';
    this.dispatch({ status: this.status, type: 'status' });
  };

  public resume = (): void => {
    this.status['all'] = 'running';
    if (this.status.historic === 'running') {
      this.resumeHistoric();
    }
    if (this.status.live === 'running') {
      this.resumeLive();
    }
  };

  public clear = (): void => {
    const remove: ContainerType[] = [];
    while (this.displayBuffer.size() > 0) {
      remove.push(this.displayBuffer.pop() as ContainerType);
    }
    this.liveBuffer.clear();
    this.historicBuffer.clear();
    this.displayBuffer.clear();
    this.onClear();
    this.dispatch({
      transaction: { remove },
      type: 'clear',
    });
  };

  public getDisplayItemsLength = (): number => {
    return this.displayBuffer.size();
  };

  public getDisplayItems = (): readonly ContainerType[] => {
    return this.displayBuffer.toArray();
  };

  public getLiveItemsLength = (): number => {
    return this.liveBuffer.size();
  };

  public getLiveItems = (): readonly ContainerType[] => {
    return this.liveBuffer.toArray();
  };

  public getHistoricItemsLength = (): number => {
    return this.historicBuffer.size();
  };

  public getHistoricItems = (): readonly ContainerType[] => {
    return this.historicBuffer.toArray();
  };

  public getStatus = (): Status => {
    return this.status;
  };

  public pushLiveItems = (items: ContainerType[]): void => this.pushItems(items, this.liveBuffer, 'live');
  public pushHistoricItems = (items: ContainerType[]): void => this.pushItems(items, this.historicBuffer, 'historic');

  public pushLiveItem = (item: ContainerType): void => this.push(item, this.liveBuffer, 'live');
  public pushHistoricItem = (item: ContainerType): void => this.push(item, this.historicBuffer, 'historic');

  public resumeLive = (): void => this.resumeBuffer(this.liveBuffer, 'live');
  public resumeHistoric = (): void => this.resumeBuffer(this.historicBuffer, 'historic');

  public pauseLive = (): void => {
    this.status['live'] = 'paused';
    this.dispatch({ status: this.status, type: 'status' });
  };

  public pauseHistoric = (): void => {
    this.status['historic'] = 'paused';
    this.dispatch({ status: this.status, type: 'status' });
  };

  protected onSubscribe = (): DisplayContainerFunctions<ContainerType, Event, BufferType> => {
    return {
      clear: this.clear,
      getDisplayItems: this.getDisplayItems,
      getDisplayItemsLength: this.getDisplayItemsLength,
      getHistoricItems: this.getHistoricItems,
      getHistoricItemsLength: this.getHistoricItemsLength,
      getLiveItems: this.getLiveItems,
      getLiveItemsLength: this.getLiveItemsLength,
      getStatus: this.getStatus,
      pause: this.pause,
      pauseHistoric: this.pauseHistoric,
      pauseLive: this.pauseLive,
      pushHistoricItem: this.pushHistoricItem,
      pushHistoricItems: this.pushHistoricItems,
      pushLiveItem: this.pushLiveItem,
      pushLiveItems: this.pushLiveItems,
      resume: this.resume,
      resumeHistoric: this.resumeHistoric,
      resumeLive: this.resumeLive,
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

  protected onClear = (): void => undefined;

  private pushItems = (items: ContainerType[], buffer: BufferType, status: Exclude<keyof Status, 'all'>): void => {
    let mode = this.status.all;
    if (mode === 'running') {
      mode = this.status[status];
    }
    switch (mode) {
      case 'paused':
        while (buffer.size() + items.length >= this.MaxQueueSize) {
          buffer.pop();
        }
        items.forEach(item => buffer.push(item));
        this.dispatch({
          transaction: {
            add: items,
          },
          type: `${status}_queued` as `${typeof status}_queued`,
        });
        break;
      case 'running': {
        const remove: ContainerType[] = [];
        while (this.displayBuffer.size() + items.length >= this.MaxQueueSize) {
          const item = this.displayBuffer.pop();
          if (item) {
            remove.push(item);
          }
        }
        items.forEach(item => this.displayBuffer.push(item));
        this.dispatch({
          transaction: {
            add: items,
            remove: remove.length > 0 ? remove : undefined,
          },
          type: `${status}_update` as `${typeof status}_update`,
        });
        break;
      }
    }
  };

  private push = (item: ContainerType, buffer: BufferType, status: Exclude<keyof Status, 'all'>): void => {
    this.pushItems([item], buffer, status);
  };

  private resumeBuffer = (buffer: BufferType, status: Exclude<keyof Status, 'all'>): void => {
    const queueLength = buffer.size();
    const bufferLength = this.displayBuffer.size();
    const enqueueLength = queueLength > this.MaxQueueSize ? this.MaxQueueSize : queueLength;
    const dequeueLength =
      enqueueLength + bufferLength > this.MaxQueueSize ? bufferLength - (this.MaxQueueSize - enqueueLength) : 0;

    const add: ContainerType[] = [];
    const remove: ContainerType[] = [];
    for (let i = 0; i < dequeueLength; ++i) {
      remove.push(this.displayBuffer.pop() as ContainerType);
    }
    for (let i = 0; i < enqueueLength; ++i) {
      const item = buffer.pop() as ContainerType;
      add.push(item);
      this.displayBuffer.push(item);
    }
    if (add.length > 0 || remove.length > 0) {
      this.dispatch({
        transaction: {
          add,
          remove,
        },
        type: `${status}_update` as `${typeof status}_update`,
      });
    }
    buffer.clear();
    this.status[status] = 'running';
    this.dispatch({ status: this.status, type: 'status' });
  };

  protected abstract onMessage(_event: Event): void;
}
