import { printResult } from "..";
import fs from "fs";

const advance = (position: number[], dir: string) => {
  let newPosition;
  switch (dir) {
    case "L":
      newPosition = [position[0] - 1, position[1]];
      break;
    case "R":
      newPosition = [position[0] + 1, position[1]];
      break;
    case "U":
      newPosition = [position[0], position[1] + 1];
      break;
    default:
      newPosition = [position[0], position[1] - 1];
      break;
  }
  return newPosition;
};

const part1 = (steps: [string, number][][]): number => {
  let minDistance = Infinity;
  let position = [0, 0];
  const allPoints = new Set();

  for (let step of steps[0]) {
    for (let i = 0; i < step[1]; i++) {
      position = advance(position, step[0]);
      allPoints.add(`${position[0]}-${position[1]}`);
    }
  }

  position = [0, 0];
  for (let step of steps[1]) {
    for (let i = 0; i < step[1]; i++) {
      position = advance(position, step[0]);
      if (allPoints.has(`${position[0]}-${position[1]}`)) {
        if (position[0] + position[1] < minDistance) {
          minDistance = Math.abs(position[0]) + Math.abs(position[1]);
        }
      } else {
        allPoints.add(`${position[0]}-${position[1]}`);
      }
    }
  }
  return minDistance;
};

const part2 = ([wire1, wire2]: [string, number][][]): number => {
  let wire1Position = [0, 0];
  let wire2Position = [0, 0];

  let wire1Points = new Map();
  let wire2Points = new Map();
  let it = 0;
  let wire1Steps = 0;
  let wire2Steps = 0;
  while(true) {
    for (let i = 0; i < wire1[it][1]; i++) {
      wire1Steps++;
      wire1Position = advance(wire1Position, wire1[it][0]);
      if (wire2Points.has(`${wire1Position[0]}-${wire1Position[1]}`)) {
        return wire1Steps + wire2Points.get(`${wire1Position[0]}-${wire1Position[1]}`);
      } else {
        wire1Points.set(`${wire1Position[0]}-${wire1Position[1]}`, wire1Steps);
      }
    }
    for (let i = 0; i < wire2[it][1]; i++) {
      wire2Steps++;
      wire2Position = advance(wire2Position, wire2[it][0]);
      if (wire1Points.has(`${wire2Position[0]}-${wire2Position[1]}`)) {
        return wire2Steps + wire1Points.get(`${wire2Position[0]}-${wire2Position[1]}`);
      } else {
        wire2Points.set(`${wire2Position[0]}-${wire2Position[1]}`, wire2Steps);
      }
    }
    it++;
  }
};

fs.readFile(`${__dirname}/test-input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split("\n")
    .filter(el => el !== "")
    .map(rawWire =>
      rawWire
        .split(",")
        .map(i => [i[0], parseInt(i.slice(1), 10)] as [string, number])
    );

  console.log(part2(data));
});
