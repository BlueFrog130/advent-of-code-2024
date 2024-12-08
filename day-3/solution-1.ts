import { readFile } from "node:fs/promises";
import { Solution } from "../util";

const solution: Solution = {
  async part1(input) {
    const file = await readFile(input, "utf-8");

    const matches = file.matchAll(/mul\((\d+),(\d+)\)/g);

    let total = 0;
    for (const match of matches) {
      const [_, a, b] = match;
      total += Number(a) * Number(b);
    }

    return total;
  },
  async part2(input) {
    let file = await readFile(input, "utf-8");

    let buffer = "";

    type Token =
      | {
          type: "do"; // do()
        }
      | {
          type: "dont"; // don't()
        }
      | {
          type: "mul"; // mul(a, b)
          a: number;
          b: number;
        };

    const tokens: Token[] = [];

    // tokenize
    for (const char of file) {
      if (char === "d") {
        buffer = "";
      } else if (char === "m") {
        buffer = "";
      } else if (char === ")") {
        if (buffer === "do(") {
          tokens.push({ type: "do" });
        } else if (buffer === "don't(") {
          tokens.push({ type: "dont" });
        } else if (buffer.startsWith("mul(")) {
          // Ensure everything between ( and ) is a number, space, or comma
          buffer += char;
          if (!/mul\(\d+,\d+\)/.test(buffer)) {
            continue;
          }

          const [a, b] = buffer.slice(4, -1).split(",").map(Number);
          if (isNaN(a) || isNaN(b)) {
            debugger;
          }
          tokens.push({ type: "mul", a: Number(a), b: Number(b) });
        }
        buffer = "";
      }

      buffer += char;
    }

    // evaluate
    let enabled = true;
    let total = 0;

    for (const token of tokens) {
      switch (token.type) {
        case "do":
          enabled = true;
          break;
        case "dont":
          enabled = false;
          break;
        case "mul":
          if (enabled) {
            total += token.a * token.b;
          }
          break;
      }
    }

    return total;
  },
};

export default solution;
