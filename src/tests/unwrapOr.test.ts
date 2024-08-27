import { ok, err, Result } from "neverthrow";

describe("Result.unwrapOr method", () => {
  const multiply = (value: number): number => value * 2;

  it("should return the default value when the Result is Err", () => {
    const myResult: Result<number, string> = err("Oh nooo");
    const unwraped: number = myResult.map(multiply).unwrapOr(10);
    expect(unwraped).toBe(10);
  });

  it("should return the mapped value when the Result is Ok", () => {
    const myResult: Result<number, string> = ok(5);
    const unwraped: number = myResult.map(multiply).unwrapOr(10);
    expect(unwraped).toBe(10);
  });

  it("should return the original value when no mapping is applied and Result is Ok", () => {
    const myResult: Result<number, string> = ok(5);
    const unwrapped: number = myResult.unwrapOr(10);
    expect(unwrapped).toBe(5);
  });
});
