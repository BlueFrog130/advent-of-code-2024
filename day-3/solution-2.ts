import { createReadStream } from "node:fs";
import type { Solution } from "../util";
import { readFile } from "node:fs/promises";

const tokens = {
  DO: 0,
  DONT: 1,
  OPEN_PAREN: 2,
  CLOSE_PAREN: 3,
  MUL: 4,
  COMMA: 5,
  NUMBER: 6,
};

function tokenize(input: string) {
  const tokens = [];
  let buffer = "";

  for (const char of input) {
    if (char === "d") {
      buffer = "";
    } else if (char === "m") {
      buffer = "";
    } else if (char === "(") {
      if (buffer === "do") {
        tokens.push({ type: tokens.DO });
      } else if (buffer === "don't") {
        tokens.push({ type: tokens.DONT });
      } else if (buffer === "mul") {
        tokens.push({ type: tokens.MUL });
      }
      tokens.push({ type: tokens.OPEN_PAREN });
    } else if (char === ")") {
      tokens.push({ type: tokens.CLOSE_PAREN });
    } else if (char === ",") {
      tokens.push({ type: tokens.COMMA });
    } else if (/\d/.test(char)) {
      buffer += char;
    }
  }

  return tokens;
}

const solution: Solution = {
  async part1(input) {
    const file = readFile(input);

    return 0;
  },
  async part2(input) {
    return 0;
  },
};

export default solution;
