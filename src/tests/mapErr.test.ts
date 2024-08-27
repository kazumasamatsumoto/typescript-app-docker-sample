import { ok, err, Result } from "neverthrow";

describe("Result.mapErr method", () => {
  it("should map the error when the Result is Err", () => {
    const myResult: Result<number, string> = err("Initial error");
    const mappedResult = myResult.mapErr((error) => `Mapped: ${error}`);
    expect(mappedResult.isErr()).toBe(true);
    if (mappedResult.isErr()) {
      expect(mappedResult.error).toBe("Mapped: Initial error");
    }
  });
  it("should not map the error when the Result is Ok", () => {
    const myResult: Result<number, string> = ok(42);
    const mappedResult = myResult.mapErr((error) => `Mapped: ${error}`);
    expect(mappedResult.isOk()).toBe(true);
    if (mappedResult.isOk()) {
      expect(mappedResult.value).toBe(42);
    }
  });
});
