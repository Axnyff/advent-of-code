import { printResult } from "..";
import fs from "fs";

const readModes = (instruction: number, result: number[] = []): number[] => {
  if (instruction < 10) {
    return [...result, instruction];
  }
  const remainder = Math.floor(instruction / 10);
  return readModes(remainder, [...result, instruction % 10]);
};

const getVal = (
  target: number = 0,
  mode: number = 0,
  instructions: number[],
  relativeBase: number
) => {
  if (mode === 1) {
    return target;
  } else if (mode === 0) {
    return instructions[target] || 0;
  }
  return instructions[target + relativeBase] || 0;
};

const getAddress = (
  target: number = 0,
  mode: number = 0,
  instructions: number[],
  relativeBase: number
) => {
  if (mode === 0) {
    return target;
  }
  return target + relativeBase;
};

function* readInstructions(instructions: number[]) {
  let position = 0;
  let input = 0;
  let relativeBase = 0;
  outer: while (true) {
    const instruction = instructions[position];
    const instructionCode = instruction % 100;
    const modes = readModes(Math.floor(instruction / 100));
    let first = getVal(
      instructions[position + 1],
      modes[0],
      instructions,
      relativeBase
    );
    let second = getVal(
      instructions[position + 2],
      modes[1],
      instructions,
      relativeBase
    );
    const third = getAddress(
      instructions[position + 3],
      modes[2],
      instructions,
      relativeBase
    );
    switch (instructionCode) {
      case 1:
        instructions[third] = first + second;
        position += 4;
        break;
      case 2:
        instructions[third] = first * second;
        position += 4;
        break;
      case 3:
        input = yield undefined;
        first = getAddress(
          instructions[position + 1],
          modes[0],
          instructions,
          relativeBase
        );
        instructions[first] = input;
        position += 2;
        break;
      case 4:
        yield first;
        position += 2;
        break;
      case 5:
        if (first !== 0) {
          position = second;
        } else {
          position += 3;
        }
        break;
      case 6:
        if (first === 0) {
          position = second;
        } else {
          position += 3;
        }
        break;
      case 7:
        if (first < second) {
          instructions[third] = 1;
        } else {
          instructions[third] = 0;
        }
        position += 4;
        break;
      case 8:
        if (first === second) {
          instructions[third] = 1;
        } else {
          instructions[third] = 0;
        }
        position += 4;
        break;
      case 9:
        relativeBase += first;
        position += 2;
        break;
      case 99:
        break outer;
    }
  }
}

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

const positionToKey = (position: number[]) => position[0] + "," + position[1];

const paint = (data: number[], defaultValue: number): Map<string, number> => {
  let dirIndex = 0;
  let position = [0, 0];
  const colors = new Map();
  const gen = readInstructions(data);
  let isPainting = true;
  while (true) {
    let key = positionToKey(position);
    let colorValue = colors.get(key);
    if (colorValue === undefined) {
      colorValue = defaultValue;
    }
    const { value, done } = gen.next(colorValue);
    if (value !== undefined) {
      if (isPainting) {
        colors.set(key, value);
        isPainting = false;
      } else {
        dirIndex = (dirs.length + dirIndex + (value * 2 - 1)) % dirs.length;
        position = [
          position[0] + dirs[dirIndex][0],
          position[1] + dirs[dirIndex][1]
        ];
        isPainting = true;
      }
    }
    if (done) {
      break;
    }
  }
  return colors;
};

const part1 = (data: number[]) => {
  const colors = paint(data, 0);
  return colors.size;
};

const keyToPosition = (key: string) => {
  return key.split(',').map(Number);
}

const part2 = (data: number[]) => {
  const colors = paint(data, 1);
  const allPositions = Array.from(colors.keys(), keyToPosition);

  const sortedByX = allPositions.sort(([x], [x2]) => x - x2);

  const minX = sortedByX[0][0];
  const maxX = sortedByX[sortedByX.length - 1][0];

  const sortedByY = allPositions.sort(([_, y], [_2, y2]) => y - y2);
  const minY = sortedByY[0][1];
  const maxY = sortedByY[sortedByY.length - 1][1];
  let allLines : string[]= [];
  for (let y = minY; y <= maxY; y++) {
    const line = [];
    for (let x = minX; x < maxX; x++) {
      let colorValue = colors.get(positionToKey([x, y]));
      if (colorValue === undefined) {
        colorValue === 1;
      }
      line.push(colorValue === 1 ? "#" : " ");
    }
    allLines = [line.join(''), ...allLines];
  }

  return allLines.join('\n');
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));

  printResult(part1(data), part2(data));
});
