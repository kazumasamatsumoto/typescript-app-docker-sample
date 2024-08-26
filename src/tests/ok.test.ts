import { ok } from "neverthrow";

describe("neverthrow ok method", () => {
  it("should create an Ok instance with the correct data", () => {
    const myResult = ok({ myData: "test" });

    expect(myResult.isOk()).toBe(true);
    expect(myResult.isErr()).toBe(false);
    if (myResult.isOk()) {
      expect(myResult.value).toEqual({ myData: "test" });
    }
  });

  it("should allow accessing the value when result is Ok", () => {
    const myResult = ok("some value");

    if (myResult.isOk()) {
      expect(myResult.value).toBe("some value");
    }
  });
});
