import { Buffer } from './buffers/buffer';

type Status = 'paused' | 'running';

export interface ContainerElement<ContainerType> {
  add?: ContainerType[];
  addIndex?: number;
  remove?: ContainerType[];
  update?: ContainerType[];
}

export type Transaction<ContainerType> = {
  transaction: ContainerElement<ContainerType>;
  type: 'update' | 'queued';
};

export class Container<ContainerType, BufferType extends Buffer<ContainerType>> {
  private queuedBuffer: BufferType;
  private runningBuffer: BufferType;
  private MaxQueueSize = 10000;
  private status: Status = 'running';

  constructor(MaxQueueSize = 10000, runningBuffer: BufferType, queuedBuffer: BufferType) {
    this.MaxQueueSize = MaxQueueSize;
    this.queuedBuffer = queuedBuffer;
    this.runningBuffer = runningBuffer;
  }

  public pause = (): void => {
    this.status = 'paused';
  };

  public resume = (): Transaction<ContainerType> => {
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
    this.queuedBuffer.clear();
    this.status = 'running';
    return {
      transaction: {
        add,
        addIndex: 0,
        remove,
      },
      type: 'update',
    };
  };

  public clear = (): { remove: ContainerType[] } => {
    const remove = this.runningBuffer.toArray() as ContainerType[];
    this.queuedBuffer.clear();
    this.runningBuffer.clear();
    return { remove };
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

  public pushItems = (items: ContainerType[]): Transaction<ContainerType> => {
    switch (this.status) {
      case 'paused':
        while (this.queuedBuffer.size() + items.length >= this.MaxQueueSize) {
          this.queuedBuffer.pop();
        }
        items.forEach(item => this.queuedBuffer.push(item));
        return {
          transaction: {
            add: items,
            addIndex: 0,
          },
          type: 'queued',
        };
      case 'running': {
        const remove: ContainerType[] = [];
        while (this.runningBuffer.size() + items.length >= this.MaxQueueSize) {
          const item = this.runningBuffer.pop();
          if (item) {
            remove.push(item);
          }
        }
        items.forEach(item => this.runningBuffer.push(item));
        return {
          transaction: {
            add: items,
            addIndex: 0,
            remove: remove.length > 0 ? remove : undefined,
          },
          type: 'update',
        };
      }
    }
  };

  public updateItems = (items: ContainerType[]): Transaction<ContainerType> => {
    switch (this.status) {
      case 'paused': {
        const changes = items.reduce(
          (acc, item) => {
            const q = this.queuedBuffer.indexOf(item);
            if (q > -1) {
              this.queuedBuffer.update(item, q);
              return acc;
            }
            const r = this.runningBuffer.indexOf(item);
            if (r > -1) {
              this.runningBuffer.update(item, r);
              acc.updatedItems.push(item);
              return acc;
            }
            acc.newItems.push(item);
            return acc;
          },
          { newItems: [] as ContainerType[], updatedItems: [] as ContainerType[] },
        );

        const transaction = this.pushItems(changes.newItems);
        transaction.transaction.update = changes.updatedItems;
        return transaction;
      }
      case 'running': {
        const changes = items.reduce(
          (acc, item) => {
            const r = this.runningBuffer.indexOf(item);
            if (r > -1) {
              this.runningBuffer.update(item, r);
              acc.updatedItems.push(item);
              return acc;
            }
            acc.newItems.push(item);
            return acc;
          },
          { newItems: [] as ContainerType[], updatedItems: [] as ContainerType[] },
        );

        const transaction = this.pushItems(changes.newItems);
        transaction.transaction.update = changes.updatedItems;
        return transaction;
      }
    }
  };

  public push = (item: ContainerType) => {
    return this.pushItems([item]);
  };
}
