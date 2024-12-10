import { createReadStream } from "fs";
import { createInterface } from "readline";
import { Solution } from "../util";

export async function s2part1(inputPath: string) {
    const stream = createReadStream(inputPath);

    const rl = createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    const left: number[] = [];
    const right: number[] = [];

    for await (const line of rl) {
        const a = Number(line.slice(0, 5));
        const b = Number(line.slice(8));
        insertSorted(left, a);
        insertSorted(right, b);
    }

    let total = 0;
    for (let i = 0; i < left.length; i++) {
        total += Math.abs(left[i] - right[i]);
    }

    return total;
}

async function s2part2(inputPath: string) {
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

function insertSorted(arr: number[], value: number) {
    // Binary search to find the index to insert the value
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        const mid = (low + high) >>> 1;
        if (arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    arr.splice(low, 0, value);
}

const solution: Solution = {
    part1: s2part1,
    part2: s2part2,
};

export default solution;