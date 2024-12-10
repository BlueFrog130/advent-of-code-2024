import { benchmark, input } from "../util";
import solution1 from "./solution-1";
import solution2 from "./solution-2";

const inputPath = await input(import.meta);

await benchmark("Day 2", [solution1, solution2], inputPath);
