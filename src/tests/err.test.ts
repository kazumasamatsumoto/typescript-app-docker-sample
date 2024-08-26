import { err } from "neverthrow";

describe("neverthrow err method", () => {
  it("should create an Err instance with the correct error message", () => {
    const myResult = err("Oh nooooo");
    expect(myResult.isOk()).toBe(false);
    expect(myResult.isErr()).toBe(true);
    if (myResult.isErr()) {
      expect(myResult.error).toBe("Oh nooooo");
    }
  });

  it("should create an Err instance with an Error object", () => {
    const error = new Error("Something went wrong");
    const myResult = err(error);
    expect(myResult.isOk()).toBe(false);
    expect(myResult.isErr()).toBe(true);
    if (myResult.isErr()) {
      expect(myResult.error).toBe(error);
    }
  });
});
