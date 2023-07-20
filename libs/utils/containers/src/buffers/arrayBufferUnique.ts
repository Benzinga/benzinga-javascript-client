import { Buffer } from './buffer';

/*
 * this is a simply an array that we binary search for enqueue and insert
 *
 * clear = O(1)
 * enqueue = log(n) + memory shift (if not last item)
 * dequeue = O(1) + memory shift
 * size= O(1)
 * toArray = O(1)
 */
export class ArrayBufferUnique<T> implements Buffer<T> {
  private array: T[] = [];
  private indexDecrement = 0;
  private cache = new Map<unknown, number>();
  private uniqueIdLookup: (data: T) => unknown;

  constructor(uniqueId: (data: T) => unknown) {
    this.uniqueIdLookup = uniqueId;
  }

  public clear = (): void => {
    this.indexDecrement = 0;
    this.cache.clear();
    this.array = [];
  };

  public clone = (): ArrayBufferUnique<T> => {
    const queue = new ArrayBufferUnique<T>(this.uniqueIdLookup);
    queue.setArray([...this.array], this.indexDecrement, new Map(this.cache));
    return queue;
  };

  public push = (data: T): void => {
    const index = this.indexOf(data);
    if (index === -1) {
      this.cache.set(this.uniqueIdLookup(data), this.indexDecrement + this.array.length);
      this.array.push(data);
    } else {
      this.update(data, index);
    }
  };

  public pop = (): T | undefined => {
    const item = this.array.pop();
    if (item) {
      this.indexDecrement++;
      this.cache.delete(this.uniqueIdLookup(item));
    }
    return item;
  };

  public size = (): number => this.array.length;

  public indexOf = (data: T): number => {
    const index = this.cache.get(this.uniqueIdLookup(data));
    if (index !== undefined) {
      return index - this.indexDecrement;
    }
    return -1;
  };

  public update = (data: T, index: number) => {
    this.array[index] = data;
  };

  public toArray = (): readonly T[] => {
    return this.array;
  };

  private setArray = (array: T[], indexDecrement: number, cache: Map<unknown, number>): void => {
    this.array = array;
    this.indexDecrement = indexDecrement;
    this.cache = cache;
  };
}
