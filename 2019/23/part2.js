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

const convert = (lines) => {
  const allLines = [...lines, "WALK", ""];
  return allLines.join("\n").split("").map(el => el.charCodeAt(0));
};

const code = [
  "NOT C T",
  "AND D T",
  "NOT T J",
  "NOT J J",
  "NOT A T",
  "OR T J",
];

const data  = {};
for (let i = 0; i <50; i++) {
  data[i] = [i];
}
const status= {};


const shifter = (index) => ({
  shift: () => {
    const value = data[index].shift();
    if (value === undefined) {
      status[index] = 'idle';
      if (!Object.values(status).includes('on') && NAT) {
        if (yValues.has(NAT[1])) {
          console.log(NAT[1]);
          process.exit();
        } else {
          yValues.add(NAT[1]);
        }
        // IDLE
        data[0] = NAT;
        NAT = undefined;
      }
      return -1;
    }
    status[index] = 'on';
    return value;
  },
});

const dataPush = {};

const yValues = new Set();
let NAT;
const pusher = (index) => ({
  push: (value) => {
    status[index] = 'on';
    dataPush[index] = dataPush[index] || [];
    dataPush[index].push(value);
    if (dataPush[index].length === 3) {
      const dataIndex = dataPush[index].shift();
      if (dataIndex === 255) {
        NAT = dataPush[index];
        dataPush[index] = [];
      } else {
        data[dataIndex].push(...dataPush[index]);
        dataPush[index] = [];
      }
    }
  },
})


const buildMachine = async (index) => {
  const instructions = fileData.slice();
  let position = 0;
  let relativeBase = 0;
  while (true) {
    const res = await readInstructions(
      instructions,
      [position, relativeBase],
      shifter(index),
      pusher(index)
    );
    if (res === null) {
      break;
    }
    [position, relativeBase] = res;
  }
};


const fileData = fs
  .readFileSync("input")
  .toString()
  .trimEnd()
  .split(",")
  .map(Number);

const run = () => {
  for (let i = 0; i < 50; i++) {
    buildMachine(i);
  }
};


run();
