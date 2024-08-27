import { ok, err, Result } from "neverthrow";

describe("Result.andThen method", () => {
  const sq = (n: number): Result<number, number> => ok(n ** 2);

  it("should chain operations correctly (Case 1)", () => {
    // Ok(2) -> andThen(sq) -> andThen(sq) => Ok(16)
    const result1 = ok(2).andThen(sq).andThen(sq);
    expect(result1.isOk()).toBe(true);
    if (result1.isOk()) {
      expect(result1.value).toBe(16);
    }

    const result2 = ok(2).andThen(sq).andThen(err);
    expect(result2.isErr()).toBe(true);
    if (result2.isErr()) {
      expect(result2.error).toBe(4);
    }

    const result3 = ok(2).andThen(err).andThen(sq);
    expect(result3.isErr()).toBe(true);
    if (result3.isErr()) {
      expect(result3.error).toBe(2);
    }

    const result4 = err(3).andThen(sq).andThen(sq);
    expect(result4.isErr()).toBe(true);
    if (result4.isErr()) {
      expect(result4.error).toBe(3);
    }
  });

  it("should handle nested Results correctly (Case 2)", () => {
    const nested = ok(ok(1234));
    const notNested = nested.andThen((innerResult) => innerResult);

    expect(notNested.isOk()).toBe(true);
    if (notNested.isOk()) {
      expect(notNested.value).toBe(1234);
    }
  });
});
