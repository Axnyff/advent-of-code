const fs = require("fs");

const readModes = (instruction, result = []) => {
  if (instruction < 10) {
    return [...result, instruction];
  }
  const remainder = Math.floor(instruction / 10);
  return readModes(remainder, [...result, instruction % 10]);
};

const getVal = (target = 0, mode = 0, instructions, relativeBase) => {
  if (mode === 1) {
    return target;
  } else if (mode === 0) {
    return instructions[target] || 0;
  }
  return instructions[target + relativeBase] || 0;
};

const getAddress = (target = 0, mode = 0, instructions, relativeBase) => {
  if (mode === 0) {
    return target;
  }
  return target + relativeBase;
};

const readInstructions = (
  instructions,
  [position, relativeBase],
  input,
  output
) => {
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
      first = getAddress(
        instructions[position + 1],
        modes[0],
        instructions,
        relativeBase
      );
      instructions[first] = input.shift();
      position += 2;
      break;
    case 4:
      output.push(first);
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
      return null;
  }
  return [position, relativeBase];
};


const cache = {};
const executeIns = (x, y) => {
  const key = `${x},${y}`;
  if (cache[key]) {
    return cache[key];
  }
  const instructions = data.slice();
  const input = [x, y];
  const output = [];
  let position = 0;
  let relativeBase = 0;
  while (true) {
    const res = readInstructions(
      instructions,
      [position, relativeBase],
      input,
      output
    );
    if (res === null) {
      break;
    }
    [position, relativeBase] = res;
  }
  cache[key] = output[0];
  return output[0];
};



const offset = 99;
let total = 0;
const part1 = (data) => {
  let y = 10;
  let x = 0;
  while(true) {
    console.log(x, y, executeIns(x, y));
    while (executeIns(x, y) === 0) {
      x++;
    }
    while (executeIns(x, y) === 1) {
      x++;
    }
    x--;
    if (executeIns(x, y + offset) === 0) {
      y++;
      continue;
    }
    if (executeIns(x - offset, y + offset) === 0) {
      y++;
      continue;
    }
    break;
  }
  console.log((x - offset) * 10000 + y);
};

const data = fs
  .readFileSync("input")
  .toString()
  .trimEnd()
  .split(",")
  .map(Number);

part1(data.slice());
