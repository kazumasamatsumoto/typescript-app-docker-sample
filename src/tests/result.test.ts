import { ok, err, Result } from "neverthrow";

describe("Result.isOk method", () => {
  it("should return true when the Result is Ok", () => {
    const myResult: Result<number, string> = ok(42);
    expect(myResult.isOk()).toBe(true);
    expect(myResult.isErr()).toBe(false);
  });
  it("should return false when the Result is Err", () => {
    const myResult: Result<number, string> = err("Error occurred");
    expect(myResult.isOk()).toBe(false);
    expect(myResult.isErr()).toBe(true);
  });
});
