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

const readInstructions = (instructions: number[], input: number) => {
  let position = 0;
  let output = -1;
  while (true) {
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
        instructions[instructions[position + 1]] = input;
        position += 2;
        break;
      case 4:
        output = first;
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
        return output;
    }
  }
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));
  printResult(
    readInstructions(data.slice(), 1),
    readInstructions(data.slice(), 5)
  );
});
