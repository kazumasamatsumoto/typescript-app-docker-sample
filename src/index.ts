import express from "express";
import { ok, err, Result } from "neverthrow";

const app = express();
const port = 3000;

const exampleFunction = (input: number): Result<number, Error> => {
  if (input > 0) {
    return ok(input * 2);
  } else {
    return err(new Error("input must be greater than zero"));
  }
};

app.get("/:input", (req, res) => {
  const input = parseInt(req.params.input, 10);
  const result = exampleFunction(input);

  result.match(
    (value) => res.send(`<h1>Success: ${value}</h1>`),
    (error) => res.status(400).send(`<h1>Error: ${error.message}</h1>`)
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
