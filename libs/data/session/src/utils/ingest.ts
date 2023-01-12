import { SafePromise } from '@benzinga/safe-await';

export const ingest = async <T, U>(data: SafePromise<T>, callback: (data: T) => U): SafePromise<U> => {
  const result = await data;

  if (result.err) {
    return { err: result.err };
  } else {
    const value = result.ok;
    return { ok: callback(value) };
  }
};
