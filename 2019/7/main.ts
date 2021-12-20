import { printResult } from "..";
import fs from "fs";

const readModes = (instruction: number, result: number[] = []): number[] => {
  if (instruction < 10) {
    return [...result, instruction];
  }
  const remainder = Math.floor(instruction / 10);
  return readModes(remainder, [...result, instruction % 10]);
};

const getVal = (target: number, mode: number, instructions: number[]) =>
  mode === 1 ? target : instructions[target];

function* readInstructions(instructions: number[], phase: number, index: number) {
  let position = 0;
  let input = 0;
  let phaseUsed = false;
  outer: while (true) {
    const instruction = instructions[position];
    const instructionCode = instruction % 100;
    const modes = readModes(Math.floor(instruction / 100));
    const first = getVal(instructions[position + 1], modes[0], instructions);
    const second = getVal(instructions[position + 2], modes[1], instructions);
    switch (instructionCode) {
      case 1:
        instructions[instructions[position + 3]] = first + second;
        position += 4;
        break;
      case 2:
        instructions[instructions[position + 3]] = first * second;
        position += 4;
        break;
      case 3:
        if (phaseUsed === false ) {
          input = phase;
          phaseUsed = true;
        } else {
          input = yield undefined;
        }
        instructions[instructions[position + 1]] = input;
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
          instructions[instructions[position + 3]] = 1;
        } else {
          instructions[instructions[position + 3]] = 0;
        }
        position += 4;
        break;
      case 8:
        if (first === second) {
          instructions[instructions[position + 3]] = 1;
        } else {
          instructions[instructions[position + 3]] = 0;
        }
        position += 4;
        break;
      case 99:
        break outer;
    }
  }
}

const getSignal = (data: number[], phaseSequence: number[]) => {
  let output = 0;
  const gens = phaseSequence.map((phase, index) => readInstructions(data.slice(), phase, index));
  let i = 0;
  while(true) {
    const { value, done } = gens[i].next(output);
    if (value !== undefined) {
      output = value;
    }
    if (done) {
      break;
    }
    i = (i + 1) % 5;
  }
  return output;
};

const part1 = (data: number[]) => {
  let max = -Infinity;
  let maxPhase: number[] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        for (let l = 0; l < 5; l++) {
          for (let m = 0; m < 5; m++) {
            const phase = [i, j, k, l, m];
            if (Array.from(new Set(phase)).length === phase.length) {
              const signal = getSignal(data, [i, j, k, l, m]);
              if (signal > max) {
                max = signal;
                maxPhase = [i, j, k, l, m];
              }
            }
          }
        }
      }
    }
  }
  return max;
};

const part2 = (data: number[]) => {
  let max = -Infinity;
  let maxPhase: number[] = [];
  for (let i = 5; i < 10; i++) {
    for (let j = 5; j < 10; j++) {
      for (let k = 5; k < 10; k++) {
        for (let l = 5; l < 10; l++) {
          for (let m = 5; m < 10; m++) {
            const phase = [i, j, k, l, m];
            if (Array.from(new Set(phase)).length === phase.length) {
              const signal = getSignal(data, [i, j, k, l, m]);
              if (signal > max) {
                max = signal;
                maxPhase = [i, j, k, l, m];
              }
            }
          }
        }
      }
    }
  }
  return max;
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));

  printResult(part1(data), part2(data));
});
