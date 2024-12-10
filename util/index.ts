import { access, constants } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Bench } from "tinybench";

export type SolutionFn = (inputPath: string) => Promise<number>;
export type Solution = { part1: SolutionFn; part2: SolutionFn };

export async function input(meta: ImportMeta) {
    const path = fileURLToPath(meta.url);

    const input = resolve(dirname(path), "input.txt");

    // Ensure the input file exists
    try {
        await access(input, constants.R_OK);
    } catch (error) {
        throw new Error(`Input file not found: ${input}`);
    }

    return input;
}

export async function benchmark(
    name: string,
    solutions: Solution[],
    inputPath: string
) {
    // Ensure all solutions provide the same values
    const values = await Promise.all(
        solutions.map((solution) =>
            Promise.all([solution.part1(inputPath), solution.part2(inputPath)])
        )
    );

    const [[p1, p2]] = values;

    const p1Same = values.every(([v]) => p1 === v);
    const p2Same = values.every(([, v]) => p2 === v);

    if (!p1Same || !p2Same) {
        // Dump the values for debugging
        console.table(
            values.map((v, i) => ({ Solution: i + 1, Part1: v[0], Part2: v[1] }))
        );
        throw new Error("Solutions do not provide the same values");
    }

    console.log("Running benchmark...");

    const bench = new Bench({ name, time: 5000 });

    solutions.forEach((solution, i) => {
        bench.add(`Solution ${i + 1}, Part 1`, async () => {
            await solution.part1(inputPath);
        });

        bench.add(`Solution ${i + 1}, Part 2`, async () => {
            await solution.part2(inputPath);
        });
    });

    await bench.run();

    console.log(bench.name);

    // Format the results in the following table:
    // (index) | Part 1 | Part 2 | ...
    // Solution 1   | 123        | 456        | ...
    // Solution 2   | 789        | 101112     | ...

    const table = solutions.reduce((acc, _, i) => {
        const part1 = bench.tasks[i * 2].result!.latency.mean.toFixed(3) + " ms";
        const part2 = bench.tasks[i * 2 + 1].result!.latency.mean.toFixed(3) + " ms";

        acc[`Solution ${i + 1}`] = { "Part 1 (ms)": part1, "Part 2 (ms)": part2 };

        return acc;
    }, {});

    console.table(
        table
    );
}
