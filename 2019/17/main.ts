import { printResult, buildCallbagMachine } from "..";
import fs from "fs";

const posToKey = (pos: number[]) => `${pos[0]},${pos[1]}`;

const drawMap = (input: string): [Map<string, string>, number, number] => {
  const map = new Map();
  let maxX = 0;
  let maxY = 0;
  input.split("\n").forEach((line, y) => {
    maxY = y;
    line.split("").forEach((char, x) => {
      maxX = x;
      map.set(posToKey([x, y]), char);
    });
  });
  return [map, maxX, maxY];
};

const dirs = ["^", ">", "v", "<"];
const dirsDiff: { [K: string]: [number, number] } = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0]
};

const countAlignmentParameters = (
  map: Map<string, string>,
  maxX: number,
  maxY: number
): number => {
  const intersections: number[][] = [];
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      if (
        map.get(posToKey([x, y])) === "#" &&
        map.get(posToKey([x - 1, y])) === "#" &&
        map.get(posToKey([x + 1, y])) === "#" &&
        map.get(posToKey([x, y + 1])) === "#" &&
        map.get(posToKey([x, y - 1])) === "#"
      ) {
        intersections.push([x, y]);
      }
    }
  }
  let sum = 0;
  for (let [x, y] of intersections) {
    sum += x * y;
  }

  return sum;
};

const part1 = (data: number[]) => {
  const source = buildCallbagMachine(data);

  let result = "";
  source(0, (type: number, payload: any) => {
    let talkback;
    if (type === 0) {
      talkback = payload;
      talkback(1);
    }
    if (type === 1) {
      result += String.fromCharCode(payload);
    }
    if (type === 2) {
      return;
    }
  });
  return countAlignmentParameters(...drawMap(result));
};

const findRobotPosition = (input: string) => {
  let posX = 0;
  let posY = 0;
  input.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (dirs.includes(char)) {
        posX = x;
        posY = y;
      }
    });
  });
  return [posX, posY];
};

const getPatternCount = (s: string, pattern: string) =>
  (s.match(new RegExp(pattern, "g")) || []).length;

const part2 = (rawData: number[]) => {
  let data = rawData.slice();
  data[0] = 2;
  const source = buildCallbagMachine(data);

  const patternA = ["L",10,"L",12,"R",6];
  const patternB = ["R",10,"L",4,"L",4,"L",12]
  const patternC = ["L",10,"R",10,"R",6,"L",4];

  const order = ["A", "B", "A", "B", "A", "C", "B", "C", "A", "C"];

  const dataToSend = order.join(',')  + '\n'+ patternA.join(',')  + '\n'+ patternB.join(',')  + '\n'+ patternC.join(',')  + '\n'+ 'n' + '\n';
  let i = 0;
  let output = 0;
  let talkback: any;
  source(0, (type: number, payload: any) => {
    if (type === 0) {
      talkback = payload;
      talkback(1);
    }
    if (type === 1 && payload !== undefined) {
      output = payload;
    }
    if (type === 1 && payload === undefined) {
      talkback(1, dataToSend.charCodeAt(i++));
    }
    if (type === 2) {
      return;
    }
  });

  // find path
  // const [map, minX, maxX] = drawMap(result);
  // let [posX, posY] = findRobotPosition(result);

  // let instructions: (number | string)[] = ["L"];
  // let dir = "<";
  // let iter = -1;
  // while (true) {
  //   let tempX = posX + dirsDiff[dir][0];
  //   let tempY = posY + dirsDiff[dir][1];
  //   if (map.get(posToKey([tempX, tempY])) === "#") {
  //     posX = tempX;
  //     posY = tempY;
  //     iter++;
  //   } else {
  //     instructions.push(iter + 1);
  //     iter = 0;
  //     let tempDir = dirs[(dirs.indexOf(dir) + 1) % dirs.length];
  //     tempX = posX + dirsDiff[tempDir][0];
  //     tempY = posY + dirsDiff[tempDir][1];
  //     if (map.get(posToKey([tempX, tempY])) === "#") {
  //       instructions.push("R");
  //       dir = tempDir;
  //       posX = tempX;
  //       posY = tempY;
  //     } else {
  //       let tempDir = dirs[(dirs.indexOf(dir) + 3) % dirs.length];
  //       tempX = posX + dirsDiff[tempDir][0];
  //       tempY = posY + dirsDiff[tempDir][1];
  //       if (map.get(posToKey([tempX, tempY])) === "#") {
  //         instructions.push("L");
  //         dir = tempDir;
  //         posX = tempX;
  //         posY = tempY;
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // }
  return output;
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));

  printResult(part1(data.slice()),part2(data.slice()));
});
