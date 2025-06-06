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

const part1 = (data: number[]) => {
  const gen = readInstructions(data.slice());
  let blockCount = 0;
  while (true) {
    const { value, done } = gen.next();
    if (done) {
      break;
    }
    const x = value;
    const y = gen.next().value;
    const id = gen.next().value;
    if (id === 2) {
      blockCount++;
    }
  }
  return blockCount;
};

const part2 = (data: number[]) => {
  data[0] = 2;
  const gen = readInstructions(data);
  let ballX = 0;
  let paddleX = 0;
  let score = 0;
  while (true) {
    let input = 0;
    if (ballX > paddleX) {
      input = 1;
    }
    if (ballX < paddleX) {
      input = -1;
    }
    const { value, done } = gen.next(input);
    if (done) {
      break;
    }
    if (value) {
      const x = value;
      const y = gen.next().value;
      const id = gen.next().value;
      if (id && x === -1 && y === 0) {
        score = id;
      }
      if (id === 4) {
        ballX = x;
      }
      if (id === 3) {
        paddleX = x;
      }
    }
  }
  return score;
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));

  printResult(part1(data), part2(data));
});
