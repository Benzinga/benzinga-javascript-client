import { Buffer } from './buffer';

class Node<T> {
  public data: T;
  public next?: Node<T> = undefined;

  constructor(data: T) {
    this.data = data;
  }

  public SetNext = (node: Node<T>) => {
    this.next = node;
  };
}

/*
 * this is a simply implementation of link list
 *
 * clear = O(1)
 * clone = O(n)
 * enqueue = O(1)
 * dequeue = O(1)
 * size= O(1)
 * toArray = O(n)
 */
export class LinkListBuffer<T> implements Buffer<T> {
  private first?: Node<T> = undefined;
  private last?: Node<T> = undefined;
  private queueSize = 0;

  public clear = (): void => {
    this.first = undefined;
    this.last = undefined;
    this.queueSize = 0;
  };

  public clone = (): LinkListBuffer<T> => {
    const queue = new LinkListBuffer<T>();
    let temp = this.first;
    while (temp) {
      queue.push(temp.data);
      temp = temp.next;
    }
    return queue;
  };

  public push = (data: T): void => {
    const node = new Node(data);

    if (this.first === undefined) {
      this.first = node;
    } else if (this.last) {
      this.last.SetNext(node);
    }

    this.last = node;
    this.queueSize += 1;
  };

  public pop = (): T | undefined => {
    const temp = this.first;
    this.first = this.first?.next;
    if (temp === this.last) {
      this.last = undefined;
    }

    this.queueSize -= 1;
    return temp?.data;
  };

  public size = (): number => this.queueSize;

  public toArray = (): readonly T[] => {
    let temp = this.first;
    const list = [] as T[];
    while (temp) {
      list.push(temp.data);
      temp = temp.next;
    }
    return list;
  };
}
