import { utilsSafeAwait } from './utils-safe-await';

describe('utilsSafeAwait', () => {
  it('should work', () => {
    expect(utilsSafeAwait()).toEqual('utils-safe-await');
  });
});
