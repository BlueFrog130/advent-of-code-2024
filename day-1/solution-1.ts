import { createReadStream } from "node:fs";
import { createInterface } from "node:readline/promises";
import { Solution } from "../util";

export async function s1part1(inputPath: string) {
    const stream = createReadStream(inputPath);

    const rl = createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    const left: number[] = [];
    const right: number[] = [];

    for await (const line of rl) {
        // const [a, b] = line.split(/[ ]+/).map(Number); // This is slower
        const a = Number(line.slice(0, 5));
        const b = Number(line.slice(8));
        left.push(a);
        right.push(b);
    }

    left.sort();
    right.sort();

    let total = 0;
    for (let i = 0; i < left.length; i++) {
        total += Math.abs(left[i] - right[i]);
    }

    return total;
}

export async function s1part2(inputPath: string) {
    const stream = createReadStream(inputPath);

    const rl = createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    const left: number[] = [];
    // maps number to its count
    const right = new Map<number, number>();

    for await (const line of rl) {
        const a = Number(line.slice(0, 5));
        const b = Number(line.slice(8));
        left.push(a);
        right.set(b, (right.get(b) ?? 0) + 1);
    }

    let score = 0;
    for (const num of left) {
        score += (num * (right.get(num) ?? 0));
    }

    return score;
}

const solution: Solution = {
    part1: s1part1,
    part2: s1part2,
};

export default solution;