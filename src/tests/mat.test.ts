import { ok, err, Result } from "neverthrow";

describe("Result.map method", () => {
  it("should map the value when the Result is Ok", () => {
    const myResult: Result<number, string> = ok(42);
    const mappedResult = myResult.map((value) => value * 2);
    expect(mappedResult.isOk()).toBe(true);
    if (mappedResult.isOk()) {
      expect(mappedResult.value).toBe(84);
    }
  });

  it("should not map the value when the Result is Err", () => {
    const myResult: Result<number, string> = err("Error occurred");
    const mappedResult = myResult.map((value) => value * 2);
    expect(mappedResult.isErr()).toBe(true);
    if (mappedResult.isErr()) {
      expect(mappedResult.error).toBe("Error occurred");
    }
  });
});
