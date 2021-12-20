import { printResult, buildCallbagMachine } from "..";
import fs from "fs";

const pattern = [0, 1, 0, -1];

const calculatePhase = (input: number[]) => {
  let res: number[] = [];
  for (let i = 0; i < input.length; i++) {
    let calc = 0;
    for (let j = 0; j < input.length; j++) {
      const patternIndex = Math.floor((j + 1) / (i+ 1)) % pattern.length;
      calc += pattern[patternIndex] * input[j];;
    }
    res.push(Math.abs(calc) % 10);
  };
  return res;
};


const part1 = (input: number[]) => {
  for (let i = 0; i < 100; i++) {
    input = calculatePhase(input);
  }
  return input.join('').slice(0, 8);
};

const calculatePhasePart2 = (input: number[]) => {
  let res: number[] = [];
  let sum = input.reduce((a, b) => a + b);
  for (let i = 0; i< input.length; i++) {
    res.push(sum % 10);
    sum -= input[i];
  }
  return res;
};

const part2 = (input: number[]) => {
  const offset = parseInt(input.slice(0, 7).join(''), 10);
  let newInput = [];
  for (let i = 0; i < 10000; i++ ){
    newInput.push(...input);
  }
  newInput = newInput.slice(offset);
  for (let i = 0; i < 100; i++) {
    newInput = calculatePhasePart2(newInput);
  }
  return newInput.slice(0, 8).join('');
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split("")
    .filter(el => el.trim() !== "")
    .map(el => parseInt(el, 10));

  printResult(part1(data), part2(data));
});
