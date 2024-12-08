import { createReadStream } from "node:fs";
import { createInterface } from "node:readline/promises";
import { Solution } from "../util";

async function part1(inputPath: string) {
  const stream = createReadStream(inputPath);

  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let safeCount = 0;
  for await (const line of rl) {
    const report = line.split(" ").map(Number);
    if (isReportSafe(report)) safeCount++;
  }

  return safeCount;
}

async function part2(inputPath: string) {
  const stream = createReadStream(inputPath);

  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let safeCount = 0;
  for await (const line of rl) {
    const report = line.split(" ").map(Number);
    if (isReportSafe(report)) safeCount++;
    else {
      const len = report.length;
      for (let i = 0; i < len; i++) {
        let removed = report.splice(i, 1);
        if (isReportSafe(report)) {
          safeCount++;
          break;
        }
        report.splice(i, 0, removed[0]);
      }
    }
  }
  return safeCount;
}

function isReportSafe(report: number[]) {
  const len = report.length;
  const dir = report[1] > report[0] ? 1 : -1;

  // Ensure every value is ascending or descending
  for (let i = 1; i < len; i++) {
    if (dir === 1 && report[i] < report[i - 1]) return false;
    if (dir === -1 && report[i] > report[i - 1]) return false;

    const diff = Math.abs(report[i] - report[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }

  return true;
}

export const solution: Solution = { part1, part2 };

export default solution;
