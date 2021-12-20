import { printResult } from "..";
import fs from "fs";

const min = 138241;
const max = 674034;

const splitToDigits = (num: number, res: number[] = []): number[] => {
  if (num > 10) {
    const remainder = (num - (num % 10)) / 10;
    return splitToDigits(remainder, [num % 10, ...res]);
  }
  return [num, ...res];
};

const isValidPart1 = (num: number): boolean => {
  const digits = splitToDigits(num);
  if (digits.toString() !== digits.sort().toString()) {
    return false;
  }
  for (let i = 0; i < digits.length; i++) {
    if (digits.lastIndexOf(digits[i]) !== i) {
      return true;
    }
  }

  return false;
};

const part1 = () => {
  let count = 0;
  for (let i = min; i < max; i++) {
    if (isValidPart1(i)) {
      count++;
    }
  }

  return count;
};

const isValidPart2 = (num: number): boolean => {
  const digits = splitToDigits(num);
  if (digits.toString() !== digits.sort().toString()) {
    return false;
  }
  const matches = num.toString().match(/(\d)\1+/g);
  return matches !== null && matches.some(el => el.length === 2);
};

const part2 = () => {
  let count = 0;
  for (let i = min; i < max; i++) {
    if (isValidPart2(i)) {
      count++;
    }
  }

  return count;
};

printResult(part1(), part2());
