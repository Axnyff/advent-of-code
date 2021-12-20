import { printResult } from "..";
import fs from "fs";

const countOrbits = (
  orbits: { [K: string]: string[] },
  center: string = "COM",
  distance: number = 0
): number => {
  const currentOrbits = orbits[center];
  if (currentOrbits === undefined) {
    return 0;
  }
  const total =
    currentOrbits.length * (distance + 1) +
    currentOrbits
      .map(orbit => countOrbits(orbits, orbit, distance + 1))
      .reduce((a, b) => a + b, 0);
  return total;
};

const countTransfers = (
  orbits: { [K: string]: string[] },
  start: string,
  target: string,
  visited: string[] = []
): number => {
  if (start === target) {
    return 0;
  }

  const newStarts = Object.entries(orbits)
    .filter(([a, b]) => b.includes(start))
    .map(([a]) => a)
    .concat(orbits[start] ? orbits[start] : [])
    .filter(a => !visited.includes(a));
  if (newStarts.includes(target)) {
    return 1;
  }
  if (!newStarts.length) {
    return Infinity;
  }
  return Math.min(
    ...newStarts.map(
      orbit =>
        1 +
        countTransfers(orbits, orbit, target, [start, ...visited, ...newStarts])
    )
  );
};

const buildOrbits = (data: string[][]) => {
  return data.reduce(
    (res, [center, orbit]) => ({
      ...res,
      [center]: res[center] ? [...res[center], orbit] : [orbit]
    }),
    {} as { [K: string]: string[] }
  );
};

const part1 = (data: string[][]) => countOrbits(buildOrbits(data));

const part2 = (data: string[][]) => {
  const orbits = buildOrbits(data);
  const startOrbit = Object.entries(orbits).find(([_, orbit]) =>
    orbit.includes("YOU")
  );
  const targetOrbit = Object.entries(orbits).find(([_, orbit]) =>
    orbit.includes("SAN")
  );
  if (startOrbit && targetOrbit) {
    return countTransfers(orbits, startOrbit[0], targetOrbit[0]);
  }
  return Infinity;
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split("\n")
    .filter(el => el !== "")
    .map(el => el.split(")"));

  printResult(part1(data), part2(data));
});
