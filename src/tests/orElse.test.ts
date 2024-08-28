import { ok, err, Result } from "neverthrow";

enum DatabaseError {
  PoolExhausted = "PoolExhausted",
  NotFound = "NotFound",
}

describe("Result.orElse method", () => {
  it("should recover from a NotFound error by returning an Ok with a default value", () => {
    const dbQueryResult: Result<string, DatabaseError> = err(
      DatabaseError.NotFound
    );

    const updateQueryResult = dbQueryResult.orElse((dbError) =>
      dbError === DatabaseError.NotFound ? ok("User does not exist") : err(500)
    );

    expect(updateQueryResult.isOk()).toBe(true);
    if (updateQueryResult.isOk()) {
      expect(updateQueryResult.value).toBe("User does not exist");
    }
  });

  it("should propagate a different error when the error is not NotFound", () => {
    const dbQueryResult: Result<string, DatabaseError> = err(
      DatabaseError.PoolExhausted
    );
    const updateQueryResult = dbQueryResult.orElse((dbError) =>
      dbError === DatabaseError.NotFound ? ok("User does not exist") : err(500)
    );

    expect(updateQueryResult.isErr()).toBe(true);
    if (updateQueryResult.isErr()) {
      expect(updateQueryResult.error).toBe(500);
    }
  });

  it("should not call orElse if the result is Ok", () => {
    const dbQueryResult: Result<string, DatabaseError> = ok("Query successful");
    const updateQueryResult = dbQueryResult.orElse((dbError) =>
      dbError === DatabaseError.NotFound ? ok("User does not exist") : err(500)
    );

    expect(updateQueryResult.isOk()).toBe(true);
    if (updateQueryResult.isOk()) {
      expect(updateQueryResult.value).toBe("Query successful");
    }
  });
});
