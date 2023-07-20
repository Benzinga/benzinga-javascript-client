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
export class ArrayBuffer<T> implements Buffer<T> {
  private array: T[] = [];

  public clear = (): void => {
    this.array = [];
  };

  public clone = (): ArrayBuffer<T> => {
    const queue = new ArrayBuffer<T>();
    queue.setArray([...this.array]);
    return queue;
  };

  public push = (data: T): void => {
    this.array.push(data);
  };

  public pop = (): T | undefined => {
    return this.array.pop();
  };

  public size = (): number => this.array.length;

  public indexOf = (data: T): number => this.array.findIndex(a => a === data);

  public update = (data: T, index: number) => {
    this.array[index] = data;
  };

  public toArray = (): readonly T[] => {
    return this.array;
  };

  private setArray = (array: T[]): void => {
    this.array = array;
  };
}
