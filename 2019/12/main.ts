import { printResult } from "..";
import fs from "fs";

type Moon = {
  index: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

const moveMoons = (moons: Moon[]): Moon[] => {
  for (let moon of moons) {
    for (let otherMoon of moons.filter(({ index }) => index !== moon.index)) {
      if (otherMoon.x !== moon.x) {
        moon.vx += Math.sign(otherMoon.x - moon.x);
      }
      if (otherMoon.y !== moon.y) {
        moon.vy += Math.sign(otherMoon.y - moon.y);
      }
      if (otherMoon.z !== moon.z) {
        moon.vz += Math.sign(otherMoon.z - moon.z);
      }
    }
  }
  for (let moon of moons) {
    moon.x += moon.vx;
    moon.y += moon.vy;
    moon.z += moon.vz;
  }
  return moons;
};

const parseMoon = (input: string, index: number): Moon => {
  const match = input.match(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/) as string[];
  return {
    index,
    x: parseInt(match[1]),
    y: parseInt(match[2]),
    z: parseInt(match[3]),
    vx: 0,
    vy: 0,
    vz: 0
  };
};

const calculateEnergy = (moons: Moon[]): number =>
  moons.reduce((total, moon) => {
    const potentialEnergy =
      Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
    const kineticEnergy =
      Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
    return total + potentialEnergy * kineticEnergy;
  }, 0);

const part1 = (initialMoons: Moon[]) => {
  let moons: Moon[] = initialMoons.map(moon => ({ ...moon }));
  for (let i = 0; i < 1000; i++) {
    moons = moveMoons(moons);
  }
  return calculateEnergy(moons);
};

let lcm = (n1: number, n2: number) => {
  const max = Math.max(n1, n2);
  const min = Math.min(n1, n2);

  let res = max;
  while (res % min !== 0) {
    res += max;
  }
  return res;
};

const part2 = (initialMoons: Moon[]) => {
  let moons: Moon[] = initialMoons.map(moon => ({ ...moon }));
  let stepX = 0;
  while (true) {
    stepX++;
    moons = moveMoons(moons);
    if (
      moons.every(
        (moon, ind) =>
          moon.x === initialMoons[ind].x && moon.vx === initialMoons[ind].vx
      )
    ) {
      break;
    }
  }

  moons = initialMoons.map(moon => ({ ...moon }));
  let stepY = 0;
  while (true) {
    stepY++;
    moons = moveMoons(moons);
    if (
      moons.every(
        (moon, ind) =>
          moon.y === initialMoons[ind].y && moon.vy === initialMoons[ind].vy
      )
    ) {
      break;
    }
  }
  moons = initialMoons.map(moon => ({ ...moon }));
  let stepZ = 0;
  while (true) {
    stepZ++;
    moons = moveMoons(moons);
    if (
      moons.every(
        (moon, ind) =>
          moon.z === initialMoons[ind].z && moon.vz === initialMoons[ind].vz
      )
    ) {
      break;
    }
  }
  return lcm(lcm(stepX, stepY), stepZ);
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const moons = rawData
    .toString()
    .split("\n")
    .filter(el => el !== "")
    .map((i, ind) => parseMoon(i, ind));

  printResult(part1(moons), part2(moons));
});
