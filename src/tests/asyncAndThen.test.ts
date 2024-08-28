import { ok, err, ResultAsync } from 'neverthrow';

describe('ResultAsync.andThen method', () => {
  const asyncDouble = (n: number): ResultAsync<number, Error> => {
    return ResultAsync.fromPromise(
      new Promise((resolve) => setTimeout(() => resolve(n * 2), 100)),
      handleError
    );
  };

  const asyncError = (): ResultAsync<number, Error> => {
    return ResultAsync.fromPromise(
      Promise.reject(new Error('Async operation failed')),
      handleError
    );
  };

  const handleError = (e: unknown): Error => {
    if (e instanceof Error) {
      return new Error('Unexpected error: ' + e.message);
    }
    return new Error('Unexpected error');
  };

  it('should chain async operations when the Result is Ok', async () => {
    const result = ResultAsync.fromPromise(Promise.resolve(2), handleError)
      .andThen(asyncDouble)
      .andThen(asyncDouble);
    
    const finalResult = await result;

    expect(finalResult.isOk()).toBe(true);
    if (finalResult.isOk()) {
      expect(finalResult.value).toBe(8); // 2 * 2 * 2 = 8
    }
  });

  it('should return an error when the async operation fails', async () => {
    const result = ResultAsync.fromPromise(Promise.resolve(2), handleError)
      .andThen(asyncError);

    const finalResult = await result;

    expect(finalResult.isErr()).toBe(true);
    if (finalResult.isErr()) {
      expect(finalResult.error.message).toBe('Unexpected error: Async operation failed');
    }
  });

  it('should not chain async operations when the initial Result is Err', async () => {
    const result = ResultAsync.fromPromise(Promise.reject(new Error('Initial error')), handleError)
      .andThen(asyncDouble);

    const finalResult = await result;

    expect(finalResult.isErr()).toBe(true);
    if (finalResult.isErr()) {
      expect(finalResult.error.message).toBe('Unexpected error: Initial error');
    }
  });
});
