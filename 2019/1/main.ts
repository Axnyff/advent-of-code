import { printResult } from '..';
import fs from 'fs';

fs.readFile("./1/input", (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split("\n")
    .filter(el => el !== "")
    .map(i => parseInt(i, 10));

  const part1 = data
    .map(mass => Math.floor(mass / 3) - 2)
    .reduce((total, fuel) => total + fuel, 0);

  const allFuel = (n: number, existingFuel: number[] = []) : number[]=> {
    const fuel = Math.floor(n / 3) - 2;
    if (fuel > 0) {
      return allFuel(fuel, [...existingFuel, fuel]);
    }
    return existingFuel;
  };

  const part2 = data
    .map(mass => allFuel(mass))
    .reduce((acc, fuels) => ([...acc, ...fuels]), [])
    .reduce((total, fuel) => total + fuel, 0);

  printResult(part1, part2);
});
