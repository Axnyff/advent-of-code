import { printResult } from "..";
import fs from "fs";

const getAsteroids = (
  x: number,
  y: number,
  data: boolean[][],
  lineLength: number,
  lineCount: number
): number[][] => {
  const asteroids = [];
  for (let xa = 0; xa < lineLength; xa++) {
    for (let ya = 0; ya < lineCount; ya++) {
      if ((x === xa && ya === y) || !data[ya][xa]) {
        continue;
      }
      let i,
        hasAsteroid = false;
      if (x === xa) {
        for (i = y; i !== ya; i = i + Math.sign(ya - y)) {
          if (data[i][x] && i !== ya && i !== y) {
            hasAsteroid = true;
            break;
          }
        }
        if (!hasAsteroid) {
          asteroids.push([xa, ya]);
        }
      }

      if (y === ya) {
        for (i = x; i !== xa; i += Math.sign(xa - x)) {
          if (data[y][i] && i !== xa && i !== x) {
            hasAsteroid = true;
            break;
          }
        }
        if (!hasAsteroid) {
          asteroids.push([xa, ya]);
        }
      }
      if (x !== xa && y !== ya) {
        let ratio = (x - xa) / (y - ya);
        outer: for (let i = x; i !== xa; i += Math.sign(xa - x)) {
          for (let j = y; j !== ya; j += Math.sign(ya - y)) {
            let otherRatio = (x - i) / (y - j);
            if (data[j][i] && i !== xa && i !== x && j !== y && j !== ya) {
              if (otherRatio === ratio) {
                hasAsteroid = true;
                break outer;
              }
            }
          }
        }
        if (!hasAsteroid) {
          asteroids.push([xa, ya]);
        }
      }
    }
  }
  return asteroids;
};

const findBestPosition = (data: boolean[][]): [number, number[]] => {
  let max = -Infinity;
  let bestPosition = [0, 0];
  const lineCount = data.length;
  const lineLength = data[0].length;

  for (let y = 0; y < lineCount; y++) {
    for (let x = 0; x < lineLength; x++) {
      if (!data[y][x]) {
        continue;
      }
      const asteroids = getAsteroids(x, y, data, lineLength, lineCount);
      if (asteroids.length > max) {
        max = asteroids.length;
        bestPosition = [x, y];
      }
    }
  }
  return [max, bestPosition];
};

const getQuadrant = ([x, y]: number[], [xa, ya]: number[]) => {
  if (xa >= x && ya <= y) {
    return 1;
  }

  if (xa <= x && ya >= y) {
    return 2;
  }

  if (xa >= x && ya >= y) {
    return 3;
  }

  return 4;
};

const find200 = (data: boolean[][]) => {
  let position = findBestPosition(data)[1];
  let asteroidCount = 0;
  const lineCount = data.length;
  const lineLength = data[0].length;
  while (true) {
    const asteroids = getAsteroids(
      position[0],
      position[1],
      data,
      lineLength,
      lineCount
    );
    if (asteroids.length + asteroidCount < 200) {
      asteroidCount += asteroids.length;
      data = data.map((line, y) =>
        line.map((el, x) => {
          if (el === false) {
            return false;
          }
          return !asteroids.find(
            asteroid => asteroid[0] === x && asteroid[1] === y
          );
        })
      );
    } else {
      const [x, y] = position;
      const sortedAsteroids = asteroids.sort((a, b) => {
        const quadrantA = getQuadrant(position, a);
        const quadrantB = getQuadrant(position, b);
        const [xA, yA] = a;
        const [xB, yB] = b;
        const ratioA = (yA - y) / (xA - x);
        const ratioB = (yB - y) / (xB - x);
        if (quadrantA !== quadrantB) {
          return quadrantA - quadrantB;
        }
        if (quadrantA === 1) {
          return ratioA - ratioB;
        }
        if (quadrantA === 2) {
          return ratioB - ratioA;
        }
        if (quadrantA === 3) {
          return ratioB - ratioA;
        }
        return ratioA - ratioB;
      });
      return sortedAsteroids[199 - asteroidCount];
    }
  }
};

const part1 = (data: boolean[][]) => {
  return findBestPosition(data)[0];
};

const part2 = (data: boolean[][]) => {
  const result = find200(data);
  return result[0] * 100 + result[1];
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split("\n")
    .filter(el => el !== "")
    .map(line => line.split("").map(el => el === "#"));
  printResult(part1(data), part2(data));
});
