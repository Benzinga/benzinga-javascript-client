export interface Buffer<T> {
  clear: () => void;
  clone: () => Buffer<T>;
  indexOf: (data: T) => number;
  pop: () => T | undefined;
  push: (data: T) => void;
  update: (data: T, index: number) => void;
  size: () => number;
  toArray: () => readonly T[];
}
