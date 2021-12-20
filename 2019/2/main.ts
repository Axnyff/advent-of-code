import { printResult } from '..';
import fs from "fs";

const getResult = (data: number[], noun: number, verb: number) => {
  data[1] = noun;
  data[2] = verb;
  let position = 0;
  while (data[position] !== 99) {
    const firstIndex = data[position + 1];
    const secondIndex = data[position + 2];
    const targetIndex = data[position + 3];
    if (data[position] === 1) {
      data[targetIndex] = data[firstIndex] + data[secondIndex];
    } else {
      data[targetIndex] = data[firstIndex] * data[secondIndex];
    }
    position += 4;
  }
  return data[0];
};

const part1 = (rawData: number[]) => {
  return getResult(rawData.slice(), 12, 2);
};

const part2 = (rawData: number[]) => {
  let result = 0,
    noun = 0,
    verb = 0;
  for (noun = 0; noun < 100; noun++) {
    for (verb = 0; verb < 100; verb++) {
      result = getResult(rawData.slice(), noun, verb);

      if (result === 19690720) {
        break;
      }
    }
    if (result === 19690720) {
      break;
    }
  }
  return 100 * noun + verb;
};

fs.readFile("./2/input", (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(i => parseInt(i, 10));

  printResult(part1(data), part2(data));
});
