import solution1 from "./solution-1";
import { input } from "../util";

const inputPath = await input(import.meta);

console.log(await solution1.part1(inputPath));
console.log(await solution1.part2(inputPath));
