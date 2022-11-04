export interface Buffer<T> {
  clear: () => void;
  clone: () => Buffer<T>;
  pop: () => T | undefined;
  push: (data: T) => void;
  size: () => number;
  toArray: () => readonly T[];
}
