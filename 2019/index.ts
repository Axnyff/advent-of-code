export const printResult = (part1: number | string, part2: number | string) => {
  console.log(`
====PART 1====
${part1}


====PART 2====
${part2}

`);
};

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

export const buildCallbagMachine = (instructions: number[]) => (
  type: number,
  sink: any
) => {
  let position = 0;
  let relativeBase = 0;

  const makeSource = (input?: number) => {
    while (true) {
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
          if (!input) {
            sink(1);
            return;
          }
          first = getAddress(
            instructions[position + 1],
            modes[0],
            instructions,
            relativeBase
          );
          instructions[first] = input;
          input = undefined;
          position += 2;
          break;
        case 4:
          sink(1, first);
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
          sink(2);
          return;
      }
    }
  };

  if (type === 0) {
    sink(0, (t: number, payload?: number) => {
      if (t === 1) {
        makeSource(payload);
      }
    });
  }
};
