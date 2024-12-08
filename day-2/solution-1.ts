import { createReadStream } from "node:fs";
import { createInterface } from "node:readline/promises";
import { Solution } from "../util";

async function part1(inputPath: string) {
  const stream = createReadStream(inputPath);

  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  const minSafeRange = 1;
  const maxSafeRange = 3;

  let safeCount = 0;

  for await (const line of rl) {
    const report = line.split(" ").map(Number);
    if (isReportSafe(report, [minSafeRange, maxSafeRange]) === true)
      safeCount++;
  }

  return safeCount;
}

async function part2(inputPath: string) {
  const stream = createReadStream(inputPath);

  const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  const safeRange: [number, number] = [1, 3];

  let safeCount = 0;

  for await (const line of rl) {
    const report = line.split(" ").map(Number);
    const safeValue = isReportSafe(report, safeRange);
    if (safeValue === true) safeCount++;
    // Check to see if removing the offending value makes the report safe
    else {
      // Try removing each value to see if the report is safe
      for (let i = 0, len = report.length; i < len; i++) {
        const newReport = [...report];
        newReport.splice(i, 1);
        if (isReportSafe(newReport, safeRange) === true) {
          safeCount++;
          break;
        }
      }
    }
  }

  return safeCount;
}

/**
 * Returns true if the report is safe, otherwise returns the index of the first unsafe value.
 */
function isReportSafe(report: number[], safeRange: [number, number]) {
  const [min, max] = safeRange;
  const dir: 0 | 1 = report[1] > report[0] ? 0 : 1;
  for (let i = 1, len = report.length; i < len; i++) {
    const curDir = report[i] > report[i - 1] ? 0 : 1;
    if (curDir !== dir) {
      return i;
    }
    const diff = Math.abs(report[i] - report[i - 1]);
    if (diff < min || diff > max) {
      return i;
    }
  }
  return true;
}

const solution: Solution = { part1, part2 };

export default solution;
